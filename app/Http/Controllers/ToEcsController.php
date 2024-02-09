<?php

namespace App\Http\Controllers;

use App\Models\crop;
use App\Models\to_ecs;
use App\Models\district;
use Illuminate\Http\Request;
use App\DataTables\to\ecDataTable;
use App\Models\ecs;

class ToEcsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(district $district, ecDataTable $dataTable)
    {
        return $dataTable->with(['district' => $district])->render("to-ecs.index",compact('district'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(district $district)
    {
        $crops = crop::all();
        $ecs = ecs::all();
        return view('to-ecs.create',compact('district','crops','ecs'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(district $district,Request $request)
    {
        $request->validate([
            'crop_id'=> 'required|min:0',
            'ecs_id'=> 'required|min:0',
            'app_precentage'=> 'nullable',
            'month'=> 'required|date',
            'app_mt'=> 'nullable'
            ]);
 
        $district->toEcs()->create([
            'crop_id'=> $request->crop_id,
            'ecs_id'=> $request->ecs_id,
            'month'=>$request->month,
            'app_precentage'=> $request->app_precentage,
            'app_mt'=> $request->app_mt
        ]);

        return redirect()->route('to-ecs.index',$district->id)->with('success','Crop Added');
    }

    /**
     * Display the specified resource.
     */
    public function show(district $district,to_ecs $to_ecs)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(district $district,to_ecs $to_ec)
    {
        $crops = crop::all(); 
        $ecs = ecs::all();
        return view('to-ecs.edit',compact('district','crops','ecs','to_ec'));
  
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(district $district,Request $request, to_ecs $to_ec)
    {
        $request->validate([
            'crop_id'=> 'required|min:0',
            'ecs_id'=> 'required|min:0',
            'app_precentage'=> 'nullable',
            'month'=> 'required|date',
            'app_mt'=> 'nullable'
            ]);

            $to_ec->update([
                'crop_id'=> $request->crop_id,
                'ecs_id'=> $request->ecs_id,
                'month'=>$request->month,
                'app_precentage'=> $request->app_precentage,
                'app_mt'=> $request->app_mt
        ]);

        return redirect()->route('to-ecs.index',$district->id)->with('success','Crop update');
   
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(district $district,to_ecs $to_ecs)
    {
        //
    }
}
