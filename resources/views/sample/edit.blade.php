@extends('layouts.app')

@section('content')
    <div class="container-fluid">

        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1>Edit Check List - Service</h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item ">Check List</li>
                            <li class="breadcrumb-item active">edit</li>
                        </ol>
                    </div>
                </div>
            </div><!-- /.container-fluid -->
        </section>

        <div>

            <div class="card">
                <div class="card-header">
                    <div class="card-title">Edit Check List</div>
                    <div class="card-tools">
                        <a href="{{ URL::previous() }}" class="btn btn-sm btn-dark">Back</a>
                    </div>
                </div>


                <form role="form" method="POST" action="{{ route('') }}"
                      enctype="multipart/form-data">
                    @csrf
                    @method('PUT')
                    <div class="card-body">

                    <div class="form-group row">
                            <label class="col-sm-3" for="job_id">Job Number</label>
                            <div class="col-sm-9">
                                <input type="text" disabled readonly name="job_id"
                                       class="form-control   @error('job_id') is-invalid @enderror" id="job_id"
                                       placeholder="Vehicle Number" value=" "/>
                                @error('job_id')
                                <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                    </div>


                    <div class="card-footer">
                        <button type="submit"
                                class="btn btn-dark bg-dark">
                            Submit
                        </button>
                    </div>

                </form>
            </div>
        </div>
    </div>

@endsection

@section('third_party_stylesheets') 
@stop

@section('third_party_scripts') 
@stop
