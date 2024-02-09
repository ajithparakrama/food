<?php

namespace App\Http\Controllers;

use App\Models\crop;
use App\Models\district;
use App\Models\toDistricts;
use Illuminate\Http\Request;
use App\DataTables\to\districtDataTable;

class ToDistrictsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(district $district,districtDataTable $dataTable)
    {
        return $dataTable->with(['district' => $district])->render("to-district.index",compact('district'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(district $district,)
    {
        $crops = crop::all();
        $districts = district::all();
        return view('to-district.create',compact('district','crops','districts'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(district $district,Request $request)
    {
        $request->validate([
            'crop_id'=> 'required|min:0',
            'to_id'=> 'required|min:0',
            'app_precentage'=> 'nullable',
            'month'=> 'required|date',
            'app_mt'=> 'nullable'
            ]);

        $district->toDistrict()->create([
            'crop_id'=> $request->crop_id,
            'to_id'=> $request->to_id,
            'month'=>$request->month,
            'app_precentage'=> $request->app_precentage,
            'app_mt'=> $request->app_mt
        ]);

        return redirect()->route('to-district.index',$district->id)->with('success','Crop Added');
    }

    /**
     * Display the specified resource.
     */
    public function show(district $district,toDistricts $to_district)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(district $district,toDistricts $to_district)
    {
        $crops = crop::all();
        $districts = district::all();
        return view('to-district.edit',compact('district','crops','districts','to_district'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(district $district,Request $request, toDistricts $to_district)
    {
        $request->validate([
            'crop_id'=> 'required|min:0',
            'to_id'=> 'required|min:0',
            'app_precentage'=> 'nullable',
            'month'=> 'required|date',
            'app_mt'=> 'nullable'
            ]);

            $to_district->update([
            'crop_id'=> $request->crop_id,
            'to_id'=> $request->to_id,
            'month'=>$request->month,
            'app_precentage'=> $request->app_precentage,
            'app_mt'=> $request->app_mt
        ]);

        return redirect()->route('to-district.index',$district->id)->with('success','Crop update');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(district $district,toDistricts $toDistricts)
    {
        //
    }
}
