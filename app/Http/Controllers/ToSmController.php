<?php

namespace App\Http\Controllers;

use App\Models\crop;
use App\Models\to_sm;
use App\Models\district;
use Illuminate\Http\Request;
use App\DataTables\to\smDataTable;

class ToSmController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(district $district,smDataTable $dataTable)
    {
        return $dataTable->with(['district'=>$district])->render('to-sm.index',compact('district'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(district $district,)
    {   $crops = crop::all();
        return view('to-sm.create',compact('district','crops'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(district $district,Request $request)
    {
        $request->validate([
            'crop_id'=> 'required|min:0', 
            'app_precentage'=> 'nullable',
            'month'=> 'required|date',
            'app_mt'=> 'nullable'
            ]);

        $district->toSm()->create([
            'crop_id'=> $request->crop_id, 
            'month'=>$request->month,
            'app_precentage'=> $request->app_precentage,
            'app_mt'=> $request->app_mt
        ]);

        return redirect()->route('to-sm.index',$district->id)->with('success','Crop Added');
    }

    /**
     * Display the specified resource.
     */
    public function show(district $district,to_sm $to_sm)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(district $district,to_sm $to_sm)
    {
        $crops = crop::all();
        return view('to-sm.edit',compact('district','crops','to_sm'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(district $district,Request $request, to_sm $to_sm)
    {
        $request->validate([
            'crop_id'=> 'required|min:0', 
            'app_precentage'=> 'nullable',
            'month'=> 'required|date',
            'app_mt'=> 'nullable'
            ]);

        $to_sm->update([
            'crop_id'=> $request->crop_id, 
            'month'=>$request->month,
            'app_precentage'=> $request->app_precentage,
            'app_mt'=> $request->app_mt
        ]);

        return redirect()->route('to-sm.index',$district->id)->with('success','datails updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(district $district,to_sm $to_sm)
    {
        //
    }
}
