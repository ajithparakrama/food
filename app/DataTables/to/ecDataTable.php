<?php

namespace App\DataTables\to;

use App\Models\to_ecs;
use Illuminate\Database\Eloquent\Builder as QueryBuilder;
use Yajra\DataTables\EloquentDataTable;
use Yajra\DataTables\Html\Builder as HtmlBuilder;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Yajra\DataTables\Html\Editor\Editor;
use Yajra\DataTables\Html\Editor\Fields;
use Yajra\DataTables\Services\DataTable;

class ecDataTable extends DataTable
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
        ->addColumn('action',  function($item){
                $btn = '<a href="'.route('to-ecs.edit',[$this->district->id,$item->id]).'" class="btn btn-xs btn-info" > <i class="fa fa-pen"></i></a>';
                return $btn; 
        })
        ->setRowId('id');
    }

    /**
     * Get the query source of dataTable.
     */
    public function query(to_ecs $model): QueryBuilder
    {
     //   return $model->newQuery();
     return   $model
     ->select('to_ecs.*',
     'crops.id as crop_id', 
    // 'districts.name as district'
     )
     ->where('district_id', $this->district->id)->with('crop','ecs'); 
    }

    /**
     * Optional method if you want to use the html builder.
     */
    public function html(): HtmlBuilder
    {
        return $this->builder()
                    ->setTableId('ec-table')
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
            Column::make('month'),
            Column::make('ecs.name'),
            Column::make('app_precentage'),
            Column::make('app_mt'),
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
        return 'ec_' . date('YmdHis');
    }
}
