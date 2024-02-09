<?php

namespace App\Http\Controllers;

use App\Models\crop;
use App\Models\ecs;
use App\Models\fromEcs;
use App\Models\district;
use Illuminate\Http\Request;
use App\DataTables\from\ecDataTable;

class FromEcsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(district $district,ecDataTable $dataTable)
    {
        return $dataTable->with(['district'=>$district])->render('from-ecs.index',compact('district'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(district $district)
    {
        $ecs = ecs::all();
        $crops = crop::all();
        return view('from-ecs.create',compact('district','crops','ecs'));
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

        $district->fromEcs()->create([
            'crop_id'=> $request->crop_id, 
            'ecs_id'=> $request->ecs_id, 
            'month'=>$request->month,
            'app_precentage'=> $request->app_precentage,
            'app_mt'=> $request->app_mt
        ]);

        return redirect()->route('from-ecs.index',$district->id)->with('success','details Added');
    }

    /**
     * Display the specified resource.
     */
    public function show(district $district,fromEcs $from_ec)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(district $district,fromEcs $from_ec)
    {
        $crops = crop::all();
        $ecs = ecs::all();
        return view('from-ecs.edit',compact('district','crops','from_ec','ecs'));
    }

    /**
     * Update the specified resource in storage.`
     */
    public function update(district $district,Request $request, fromEcs $from_ec)
    {
        $request->validate([
            'crop_id'=> 'required|min:0', 
            'ecs_id'=> 'required|min:0', 
            'app_precentage'=> 'nullable',
            'month'=> 'required|date',
            'app_mt'=> 'nullable'
            ]);

        $from_ec->update([
            'crop_id'=> $request->crop_id, 
            'ecs_id'=> $request->ecs_id, 
            'month'=>$request->month,
            'app_precentage'=> $request->app_precentage,
            'app_mt'=> $request->app_mt
        ]);

        return redirect()->route('from-ecs.index',$district->id)->with('success','datails updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(district $district,fromEcs $from_ec)
    {
        //
    }
}
