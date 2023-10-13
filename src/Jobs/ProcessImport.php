<?php

namespace ChrisBraybrooke\ECommerce\Jobs;

use ChrisBraybrooke\ECommerce\Imports\RecordImport;
use ChrisBraybrooke\ECommerce\Notifications\NewOrderNotification;
use Excel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Notification;
use Storage;
use Validator;

class ProcessImport implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $import;

    protected $import_class;

    protected $temp_file_path = 'import-temps/';

    protected $is_temp_file = false;

    public $tries = 1;

    public $timeout = 10600;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($import)
    {
        $this->import = $import;

        if (class_exists($import->import_to)) {
            $this->import_class = $import->import_to;
        }
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $import_file = $this->import->media->first();

        if ($import_file->disk !== 'public') {
            $this->temp_file_path = $this->temp_file_path . $import_file->file_name;
            $temp_file = Storage::disk('local')->put($this->temp_file_path, Storage::disk($import_file->disk)->get($import_file->getPath()));

            if ($temp_file) {
                $importFilePath = 'storage/app/' . $this->temp_file_path;
                $this->is_temp_file = true;
            } else {
                throw new \Exception("Creation of temp file for import failed: " . $this->temp_file_path, 422);
            }
        } else {
            $importFilePath = optional($import_file)->getPath();
        }

        if ($this->import_class && $import_file) {
            $this->import->update([
                'status' => 'Processing'
            ]);

            $import_model = new $this->import_class;

            Excel::import(new RecordImport($this->import), $this->temp_file_path);

            // Excel::selectSheetsByIndex(0)->load($import_file_path, function ($reader) use ($import_model) {
            //     $i = 0;

            //     foreach ($reader->toArray() as $key => $row) {
            //         $i++;
            //         $validator = Validator::make(
            //             $row,
            //             $import_model->importValidationRules(),
            //             $import_model->importValidationMessages($i)
            //         );
            //         if ($validator->fails()) {
            //             $this->failedMessage = $validator->messages()->first();
            //             throw new \Exception("Validation Failed: " . $validator->messages()->first(), 422);
            //         }
            //     }
            //     foreach ($reader->toArray() as $key => $row) {
            //         $new_model = $import_model->importCreate($row, $this->import);
            //         $this->rows_added[] = $new_model;
            //     }
            // });

            $this->import->update([
                'status' => 'Completed',
                'rows_added' => 3
            ]);
        } else {
            $this->import->update([
                'status' => 'Failed'
            ]);
        }
    }

    /**
     * The job failed to process.
     *
     * @param  Exception  $exception
     * @return void
     */
    public function failed(\Exception $exception)
    {
        $this->import->deleteAllModels();
        $this->import->update([
            'status' => 'Failed',
            'rows_added' => 0,
            'rows_not_added' => 0,
        ]);

        if ($this->is_temp_file) {
            Storage::delete($this->temp_file_path);
        }
    }
}
