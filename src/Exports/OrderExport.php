<?php

namespace ChrisBraybrooke\ECommerce\Exports;

use ChrisBraybrooke\ECommerce\Models\Export;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\BeforeExport;
use Maatwebsite\Excel\Events\AfterSheet;

class OrderExport implements FromCollection, WithHeadings, ShouldAutoSize, WithEvents
{
    /**
     * The export instance.
     *
     * @var \ChrisBraybrooke\ECommerce\Models\Export
     */
    protected $export;

    public function __construct(Export $export)
    {
        $this->export = $export;
    }

    public function headings(): array
    {
        return array_keys($this->export->formattedOrderData->first());
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return $this->export->formattedOrderData;
    }

    /**
     * @return array
     */
    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                $event->sheet->setHeaderRow(1);
            },
        ];
    }
}
