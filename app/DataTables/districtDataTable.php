<?php

namespace App\DataTables;

use App\Models\district;
use Illuminate\Database\Eloquent\Builder as QueryBuilder;
use Yajra\DataTables\EloquentDataTable;
use Yajra\DataTables\Html\Builder as HtmlBuilder;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Yajra\DataTables\Html\Editor\Editor;
use Yajra\DataTables\Html\Editor\Fields;
use Yajra\DataTables\Services\DataTable;

class districtDataTable extends DataTable
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
            ->addColumn('Retain', function ($item) {
              //  return ''. $item->id .''. $item->name .
              $btn  = '<a class="btn bg-warning btn-xs " href="'.route('cultivation.index',$item->id).'">Add/View</a> ';
           //   $btn .= '<a class="btn bg-warning btn-xs " href="'.route('type.index',$item->id).'">Crop Type</a>';
 
              return $btn;
            })
            ->addColumn('Out', function ($item) { 
  
                $btn = '<a class="btn bg-info btn-xs " href="'.route('to-district.index',$item->id).'">District</a> ';
                $btn .= '<a class="btn bg-info btn-xs " href="'.route('to-ecs.index',$item->id).'">Ecs</a> ';
                $btn .= '<a class="btn bg-info btn-xs " href="'.route('to-sm.index',$item->id).'">Sm</a>'; 
                return $btn;
              })
              ->addColumn('In', function ($item) { 
  
             //   $btn = '<a class="btn bg-success btn-xs " href="'.route('from-district.index',$item->id).'">District</a> ';
                $btn = '<a class="btn bg-success btn-xs " href="'.route('from-ecs.index',$item->id).'">Ecs</a> ';
                $btn .= '<a class="btn bg-success btn-xs " href="'.route('from-sm.index',$item->id).'">Sm</a>';
                return $btn;
              })
            ->rawColumns(['Retain','Out','In'])
            ->setRowId('id');
    }

    /**
     * Get the query source of dataTable.
     */
    public function query(district $model): QueryBuilder
    {
        return $model->newQuery();
    }

    /**
     * Optional method if you want to use the html builder.
     */
    public function html(): HtmlBuilder
    {
        return $this->builder()
                    ->setTableId('district-table')
                    ->columns($this->getColumns())
                    ->minifiedAjax()
                 //   ->dom('Bfrtip')
                    ->orderBy(1)
                    ->selectStyleSingle()
                    ->buttons([
                        Button::make('excel'),
                        Button::make('csv'),
                        Button::make('pdf'),
                        Button::make('print'),
                        Button::make('reset'),
                        Button::make('reload')
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
             Column::computed('Retain')
             ->title('Cultivation/Harvest Details')
                  ->exportable(false)
                  ->printable(false)
               //   ->width(60)
                  ->addClass('text-center'),
                  Column::computed('Out')
                  ->title('Out-flow transaction')
                  ->exportable(false)
                  ->printable(false)
               //   ->width(60)
                  ->addClass('text-center'),
                  Column::computed('In')
                  ->title('In-flow transaction')
                  ->exportable(false)
                  ->printable(false)
               //   ->width(60)
                  ->addClass('text-center'),
        ];
    }

    /**
     * Get the filename for export.
     */
    protected function filename(): string
    {
        return 'district_' . date('YmdHis');
    }
}
