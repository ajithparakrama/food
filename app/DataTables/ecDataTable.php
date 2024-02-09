<?php

namespace App\DataTables;

use App\Models\ecs;
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
            ->addColumn('action', function($item){
                $btn = '';
                $btn .= '<a href="'.route('ecs.edit',$item->id).'" class="btn btn-xs btn-info" > <i class="fa fa-pen"></i></a>';

                $btn .= '<form  action="' . route('ecs.destroy', $item->id) . '" method="POST" class="d-inline" >
           ' . csrf_field() . '
               ' . method_field("DELETE") . '
           <button type="submit"  class="btn bg-danger btn-xs  " onclick="return confirm(\'Do you need to delete this\');">
           <i class="fa fa-trash-alt"></i></button>
           </form> ';
           return $btn;

            })
            ->setRowId('id');
    }

    /**
     * Get the query source of dataTable.
     */
    public function query(ecs $model): QueryBuilder
    {
        return $model->newQuery();
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
                    //    Button::make('csv'),
                    //    Button::make('pdf'),
                    //    Button::make('print'),
                    //    Button::make('reset'),
                    //    Button::make('reload')
                    ]);
    }

    /**
     * Get the dataTable columns definition.
     */
    public function getColumns(): array
    {
        return [
            Column::make('DT_RowIndex')->title('#')->searchable(false)->orderable(false), 
            Column::make('name'),
            // Column::make('created_at'),
            // Column::make('updated_at'),
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
