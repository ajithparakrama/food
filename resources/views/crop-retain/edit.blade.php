@extends('layouts.app')

@section('content')
    <div class="container-fluid">

        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1>Crop of {{ $district->name }}</h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item ">Crop of {{ $district->name }}</li>
                            <li class="breadcrumb-item active">edit</li>
                        </ol>
                    </div>
                </div>
            </div><!-- /.container-fluid -->
        </section>

        <div>

            <div class="card">
                <div class="card-header">
                    <div class="card-title">Edit Crop</div>
                    <div class="card-tools">
                        <a href="{{ URL::previous() }}" class="btn btn-sm btn-dark">Back</a>
                    </div>
                </div> 

                <form role="form" method="POST" action="{{ route('cultivation.update',[$district->id,$cultivation->id]) }}"
                      enctype="multipart/form-data">
                    @csrf
                    @method('PUT')
                    <div class="card-body">

                         

                        <div class="form-group row">
                            <label class="col-sm-2" for="crop_id">Crop</label>
                            <div class="col-sm-4">
                                <select class="form-control select2 @error('crop_id') is-invalid @enderror" name="crop_id">
                                    <option value=""></option>
                                    @foreach ($crops as $item)
                                        <option value="{{ $item->id }}" @if ($item->id==$cultivation->crop_id)
                                          @selected(true)  
                                        @endif>{{ $item->name }}</option>
                                    @endforeach

                                </select>
                                @error('crop_id')
                                <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>

                            <label class="col-sm-2" for="cultivated_date">Cultivated date</label>
                            <div class="col-sm-4">
                                <input type="date" name="cultivated_date" value="{{ $cultivation->cultivated_date }}" class="form-control @error('cultivated_date') is-invalid @enderror"  id="">
                                @error('cultivated_date')
                                <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                            <div class="form-group row">
                            <label class="col-sm-2" for="cultivated_land">Cultivated Land extent(Ha)</label>
                            <div class="col-sm-4">
                                <input type="text" name="cultivated_land" value="{{ $cultivation->cultivated_land }}" class="form-control @error('cultivated_land') is-invalid @enderror" id="">
                                @error('cultivated_land')
                                <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>

                            <label class="col-sm-2" for="actual_harvest_mt">Actual harvest recorded to date (Mt)</label>
                            <div class="col-sm-4">
                                <input type="text" name="actual_harvest_mt" value="{{ $cultivation->actual_harvest_mt }}" class="form-control @error('actual_harvest_mt') is-invalid @enderror" id="actual_harvest_mt">
                                @error('actual_harvest_mt')
                                <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2" for="cultivation_changes_ha">Cultivation Changes (Ha)</label>
                            <div class="col-sm-4">
                               <input type="text" value="{{ $cultivation->cultivation_changes_ha }}" class="form-control text-right @error('cultivation_changes_ha') is-invalid @enderror"  name="cultivation_changes_ha" id="cultivation_changes_ha" placeholder="Ha">
                                @error('cultivation_changes_ha')
                                <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div> 
                            
                            <label class="col-sm-2" for="reason_for_changes">Reason for Changes</label>
                            <div class="col-sm-4">
                                <select class="form-control select2 @error('reason_for_changes') is-invalid @enderror" name="reason_for_changes">
                                    <option></option>
                                  <option @if($cultivation->reason_for_changes=="Pest/Disease Damages") @selected(true) @endif>Pest/Disease Damages</option>
                                  <option @if($cultivation->reason_for_changes=="Wet weather") @selected(true) @endif>Wet weather</option>
                                  <option @if($cultivation->reason_for_changes=="Dry weather") @selected(true) @endif>Dry weather</option>
                                  <option @if($cultivation->reason_for_changes=="Wild animal attack") @selected(true) @endif>Wild animal attack</option>
                                  <option @if($cultivation->reason_for_changes=="Other damages") @selected(true) @endif>Other damages</option>
                                </select>
                            </div> 
                            

                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2" for="total_retain">Retain (%)</label>
                            <div class="col-sm-4">
                                <input type="text" name="total_retain" value="{{ $cultivation->total_retain }}"
                                    class="form-control @error('total_retain') is-invalid @enderror" id="total_retain">
                                @error('total_retain')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>

                            <label class="col-sm-2" for="total_retain_mt"> (Mt)</label>
                            <div class="col-sm-4">
                                <input type="text" name="total_retain_mt" readonly value="{{ $cultivation->total_retain_mt }}"
                                    class="form-control @error('total_retain_mt') is-invalid @enderror"
                                    id="total_retain_mt">
                                @error('total_retain_mt')
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
<script src="{{ asset('plugin/jquery/jquery.js') }}"></script>
<script>
    $(document).ready(function() {
        var havest = 0;

        $("#total_retain").keyup(function() { 
            havest =  actual_harvest_mt = $('#actual_harvest_mt').val();
            var number1 = parseFloat($("#total_retain").val()); 
            if (!isNaN(number1) && !isNaN(havest)) {
                var percentage = havest * (number1 / 100);
                $('#total_retain_mt').val(percentage);
            } else {

            }
        });
    });
</script>
@stop
