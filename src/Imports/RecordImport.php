<?php

namespace ChrisBraybrooke\ECommerce\Imports;

use App\User;
use ChrisBraybrooke\ECommerce\Models\Import;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Validator;

class RecordImport implements ToCollection, WithHeadingRow
{
    protected $rowsAdded;

    protected $import;

    protected $importClass;

    public function __construct(Import $import)
    {
        $this->import = $import;

        if (class_exists($import->import_to)) {
            $this->importClass = $import->import_to;
        }
    }

    public function collection(Collection $rows)
    {
        $importModel = new $this->importClass;

        foreach ($rows as $key => $row)  {
            logger($row);
            $validator = Validator::make(
                $row->toArray(),
                $importModel->importValidationRules(),
                $importModel->importValidationMessages($key + 1)
            );

            if ($validator->fails()) {
                throw new \Exception('Validation Failed: ' . $validator->messages()->first(), 422);
            }
        }

        foreach ($rows as $key => $row) {
            $newModel = $importModel->importCreate($row, $this->import);
            $this->rowsAdded[] = $newModel;
        }
    }
}