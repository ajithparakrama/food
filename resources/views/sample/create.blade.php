@extends('layouts.app')

@section('content')
    <div class="container-fluid">

        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1>Check List - Service</h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item ">Check List</li>
                            <li class="breadcrumb-item active">New</li>
                        </ol>
                    </div>
                </div>
            </div><!-- /.container-fluid -->
        </section>

        <div>

            <div class="card">
                <div class="card-header">
                    <div class="card-title">Add New Job</div>
                    <div class="card-tools">
                        <a href="{{ URL::previous() }}" class="btn btn-sm btn-dark">Back</a>
                    </div>
                </div>

                <form role="form" method="POST" action="{{ route('.store') }}"
                      enctype="multipart/form-data">
                    @csrf
                    @method('POST')
                    <div class="card-body">

                         

                        <div class="form-group row">
                            <label class="col-sm-3" for="repairs_req">Repairs Required</label>
                            <div class="col-sm-9">
                                <textarea name="repairs_req" class="form-control   @error('repairs_req') is-invalid @enderror" id="repairs_req"
                                       placeholder="Nature of Service" value="{{ old('repairs_req') }}" rows="5"></textarea>
                                @error('repairs_req')
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

@push('page_scripts')



@endpush

@section('third_party_stylesheets') 
@stop

@section('third_party_scripts') 
@stop

