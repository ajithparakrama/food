@extends('layouts.app')

@section('content')
    <div class="container-fluid">

        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1>Crop of  {{ $district->name }}</h1> 
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item ">Crop of  {{ $district->name }}</li>
                            <li class="breadcrumb-item active">All</li>
                        </ol>
                    </div>
                </div>
            </div><!-- /.container-fluid -->
        </section>

        <div>

            <div class="card">
                <div class="card-header">
                    <div class="card-title">All</div>
                    <div class="card-tools">
                        <a href="{{ URL::previous() }}" class="btn btn-sm btn-dark">Back</a>
                    </div>
                </div>


                <div class="card-body">
                    {{$dataTable->table()}}

                </div>

                <div class="card-footer">

                </div>
            </div>
        </div>
    </div>
@endsection
@section('third_party_stylesheets')
    <link rel="stylesheet" href="{{ asset('plugin/datatable/buttons.dataTables.min.css') }}">
    <link rel="stylesheet" href="{{ asset('plugin/datatable/dataTables.bootstrap4.min.css') }}">
@stop

@section('third_party_scripts')
    <script src="{{ asset('plugin/jquery/jquery.js') }}"></script>
    <script src="{{ asset('plugin/datatable/jquery.validate.js') }}" defer></script>
    <script src="{{ asset('plugin/datatable/jquery.dataTables.min.js') }}" defer></script>
    <script src="{{ asset('plugin/datatable/bootstrap.min.js') }}" defer></script>
    <script src="{{ asset('plugin/datatable/dataTables.bootstrap4.min.js') }}" defer></script>
    <script src="{{ asset('plugin/datatable/dataTables.buttons.min.js') }}" defer></script>
    <script src="{{ asset('vendor/datatables/buttons.server-side.js') }}" defer></script> 

    {!! $dataTable->scripts() !!}
@stop
