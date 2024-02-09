<?php

namespace App\DataTables\retain;

use App\Models\cropDistrict;
use Illuminate\Database\Eloquent\Builder as QueryBuilder;
use Yajra\DataTables\EloquentDataTable;
use Yajra\DataTables\Html\Builder as HtmlBuilder;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Yajra\DataTables\Html\Editor\Editor;
use Yajra\DataTables\Html\Editor\Fields;
use Yajra\DataTables\Services\DataTable;

class cropDataTable extends DataTable
{
    /**
     * Build the DataTable class.
     *
     * @param QueryBuilder $query Results from query() method.
     */
    public function dataTable(QueryBuilder $query): EloquentDataTable
    {
        return (new EloquentDataTable($query))
        ->addIndexColumn()
            ->addColumn('action', function($item){
                $btn = '<a href="'.route('cultivation.edit',[$this->district->id,$item->id]).'" class="btn btn-xs btn-info" > <i class="fa fa-pen"></i></a>';
                return $btn;
            })
            ->setRowId('id');
    }

    /**
     * Get the query source of dataTable.
     */
    public function query(cropDistrict $model): QueryBuilder
    {
       // return $model->newQuery();
     //  $district = $this->district;
      // dd($district);
      return   $model->select('crop_districts.*' ,'crops.id as crop_id')->where('district_id', $this->district->id)->with('crop'); // Modify this based on your actual model and field names

      //  $this->applyScopes($query);
    }

    /**
     * Optional method if you want to use the html builder.
     */
    public function html(): HtmlBuilder
    {
        return $this->builder()
                    ->setTableId('crop-table')
                    ->columns($this->getColumns())
                    ->minifiedAjax()
                    ->dom('Bfrtip')
                    ->orderBy(1)
                    ->selectStyleSingle()
                    ->buttons([
                        Button::make('create'),
                        // Button::make('csv'),
                        // Button::make('pdf'),
                        // Button::make('print'),
                        // Button::make('reset'),
                        // Button::make('reload')
                    ]);
    }

    /**
     * Get the dataTable columns definition.
     */
    public function getColumns(): array
    {
        return [

            Column::make('DT_RowIndex')->title('#')->searchable(false)->orderable(false), 
            Column::make('crop.name'),
            Column::make('cultivated_date'),
            Column::make('cultivated_land'),
            Column::make('actual_harvest_mt'),
            Column::make('cultivation_changes_ha'),
            Column::make('reason_for_changes'),
            Column::computed('action')
            ->exportable(false)
            ->printable(false)
            ->width(60)
            ->addClass('text-center'),
        ];

        
        
        
        
        
    }

    /**
     * Get the filename for export.
     */
    protected function filename(): string
    {
        return 'crop_' . date('YmdHis');
    }
}
