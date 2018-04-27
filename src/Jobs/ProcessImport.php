<?php

namespace ChrisBraybrooke\ECommerce\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use ChrisBraybrooke\ECommerce\Notifications\NewOrderNotification;
use Notification;
use Excel;
use Validator;

class ProcessImport implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $import;

    protected $import_class;

    protected $rows_added;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($import)
    {
        $this->import = $import;
        $this->rows_added = [];

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

        if ($this->import_class && $import_file) {
            $this->import->update([
                'status' => 'Processing'
            ]);

            $import_model = new $this->import_class;
            $import_file_path = optional($import_file)->getUrl();

            Excel::selectSheetsByIndex(0)->load($import_file_path, function ($reader) use ($import_model) {
                $i = 0;

                foreach ($reader->toArray() as $key => $row) {
                    $i++;
                    $validator = Validator::make(
                        $row,
                        $import_model->importValidationRules(),
                        $import_model->importValidationMessages($i)
                    );
                    if ($validator->fails()) {
                        $this->failedMessage = $validator->messages()->first();
                        throw new \Exception("Validation Failed: " . $validator->messages()->first(), 422);
                    }
                }
                foreach ($reader->toArray() as $key => $row) {
                    $new_model = $import_model->importCreate($row, $this->import);
                    $this->rows_added[] = $new_model;
                }
            });

            $this->import->update([
                'status' => 'Completed',
                'rows_added' => count($this->rows_added)
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
            'rows_not_added' => count($this->rows_added),
        ]);
    }
}
