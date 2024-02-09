@extends('layouts.app')

@section('content')
    <div class="container-fluid">

        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1>Edit {{ $ec->name }}</h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item ">{{ $ec->name }}</li>
                            <li class="breadcrumb-item active">edit</li>
                        </ol>
                    </div>
                </div>
            </div><!-- /.container-fluid -->
        </section>

        <div>

            <div class="card">
                <div class="card-header">
                    <div class="card-title"> </div>
                    <div class="card-tools">
                        <a href="{{ URL::previous() }}" class="btn btn-xs btn-dark">Back</a>
                    </div>
                </div>


                <form role="form" method="POST" action="{{ route('ecs.update',$ec->id) }}"
                      enctype="multipart/form-data">
                    @csrf
                    @method('PUT')
                    <div class="card-body">

                        <div class="form-group row">
                            <label class="col-sm-3" for="repairs_req">District</label>
                            <div class="col-sm-4">
                                <select name="district_id" class="form-control select2" id="district_id" >
                                    <option value=""></option>
                                    @foreach ($districts as $item)
                                        <option value="{{ $item->id }}" @if ($item->id==$ec->district_id)
                                            @selected(true)
                                        @endif  >{{ $item->name }}</option>
                                    @endforeach
                                </select>
                                @error('name')
                                <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-3" for="repairs_req">Name</label>
                            <div class="col-sm-9">
                                 <input type="text" class="form-control   @error('name') is-invalid @enderror" name="name" value="{{ old('name',$ec->name) }}">
                                @error('name')
                                <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                    </div>
                    <div class="card-footer">
                        <button type="submit"
                                class="btn btn-xs btn-success float-right">
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
