<?php

namespace App\Http\Controllers;

use App\Models\crop;
use App\Models\fromSm;
use App\Models\district;
use Illuminate\Http\Request;
use App\DataTables\from\smDataTable;

class FromSmController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(district $district,smDataTable $dataTable)
    {
        return $dataTable->with(['district'=>$district])->render('from-sm.index',compact('district'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(district $district,)
    {
        $crops = crop::all();
        return view('from-sm.create',compact('district','crops'));
    
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

        $district->fromSm()->create([
            'crop_id'=> $request->crop_id,  
            'month'=>$request->month,
            'app_precentage'=> $request->app_precentage,
            'app_mt'=> $request->app_mt
        ]);

        return redirect()->route('from-sm.index',$district->id)->with('success','details Added');
    
    }

    /**
     * Display the specified resource.
     */
    public function show(district $district,fromSm $from_sm)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(district $district,fromSm $from_sm)
    {
          $crops = crop::all(); 
        return view('from-sm.edit',compact('district','crops','from_sm'));

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(district $district,Request $request, fromSm $from_sm)
    {
         $request->validate([
            'crop_id'=> 'required|min:0',  
            'app_precentage'=> 'nullable',
            'month'=> 'required|date',
            'app_mt'=> 'nullable'
            ]);

        $from_sm->update([
            'crop_id'=> $request->crop_id,  
            'month'=>$request->month,
            'app_precentage'=> $request->app_precentage,
            'app_mt'=> $request->app_mt
        ]);

        return redirect()->route('from-sm.index',$district->id)->with('success','datails updated');
    
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(district $district,fromSm $fromSm)
    {
        //
    }
}
