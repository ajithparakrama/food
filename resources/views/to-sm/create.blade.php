@extends('layouts.app')

@section('content')
    <div class="container-fluid">

        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1> {{ $district->name }} to SM</h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item "> {{ $district->name }} to SM</li>
                            <li class="breadcrumb-item active">New</li>
                        </ol>
                    </div>
                </div>
            </div><!-- /.container-fluid -->
        </section>

        <div>

            <div class="card">
                <div class="card-header">
                    <div class="card-title">Add Cultivation</div>
                    <div class="card-tools">
                        <a href="{{ URL::previous() }}" class="btn btn-sm btn-dark">Back</a>
                    </div>
                </div>

                <form role="form" method="POST" action="{{ route('to-sm.store',$district->id) }}"
                      enctype="multipart/form-data">
                    @csrf
                    @method('POST')
                    <div class="card-body">

                         

                        <div class="form-group row">
                            <label class="col-sm-2" for="crop_id">Crop</label>
                            <div class="col-sm-4">
                                <select class="form-control select2 @error('crop_id') is-invalid @enderror" name="crop_id" id="crop_id">
                                    <option value=""></option>
                                    @foreach ($crops as $item)
                                        <option value="{{ $item->id }}">{{ $item->name }}</option>
                                    @endforeach

                                </select>
                                <span id="havet"></span>
                                @error('crop_id')
                                <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>

                            <label class="col-sm-2" for="month">Month</label>
                            <div class="col-sm-4">
                                <input type="date" name="month" class="form-control @error('month') is-invalid @enderror" id="">
                                @error('month')
                                <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                            <div class="form-group row">

                            

                            <label class="col-sm-2" for="app_precentage">Total precentage</label>
                            <div class="col-sm-2">
                                <input type="text" name="app_precentage" class="form-control @error('app_precentage') is-invalid @enderror" placeholder="%" id="app_precentage">
                                @error('app_precentage')
                                <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div> 
                            <label class="col-sm-2" for="app_mt">Mt</label>
                            <div class="col-sm-2">
                               <input type="text" class="form-control text-right @error('app_mt') is-invalid @enderror"  name="app_mt" id="app_mt" placeholder="Mt">
                                @error('app_mt')
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
<script src="{{ asset('plugin/jquery/jquery.js') }}"></script>
<script>
     $(document).ready(function() {
    var havest = 0;
    $('#crop_id').change(function(){
      var crop = $('#crop_id').val();
      
        $.ajax({
            url: "{{ route('ajax.get-food-balance') }}",
            method: "GET", // or "POST" for a POST request
            data: { 
                "crop": crop, 
            },
            success: function(response) {
                $('#havet').text(response[0]['cultivated_land']);
                havest =  response[0]['cultivated_land'];
            },
            error: function(xhr, status, error) {
               console.log(error);
            }
            });
    })

   
    $("#app_precentage").keyup(function() {
    var number1 = parseFloat($("#app_precentage").val()); 

    if (!isNaN(number1) && !isNaN(havest)) {
      var percentage = havest*(number1/ 100);
       $('#app_mt').val(percentage);
    } else {
       
    }
  });
});


    
</script>
@stop

