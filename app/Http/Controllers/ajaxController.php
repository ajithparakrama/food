<?php

namespace App\Http\Controllers;

use App\Models\crop;
use Illuminate\Http\Request;

class ajaxController extends Controller
{
    public function getFoodBalance(request $request){
        $id = $request->input('crop');
        $crop = crop::where('id',$id)->get()->first();
       // dd($crop[0]->cropDistrict);
      return response()->json([
        $crop->cropDistrict->last()
        ]);
    }

}
