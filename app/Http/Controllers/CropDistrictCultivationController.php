<?php

namespace App\Http\Controllers;

use App\Models\crop;
use App\Models\district;
use App\Models\cropDistrict;
use Illuminate\Http\Request;
use App\DataTables\retain\cropDataTable;
//use App\Models\crop_district_cultivation;

class CropDistrictCultivationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(district $district, cropDataTable $dataTable)
    { 
       return $dataTable->with(['district' => $district])->render("crop-retain.index",compact('district'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(district $district,)
    {
        $crops = crop::all();
        return view('crop-retain.create',compact('district','crops'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(district $district,Request $request)
    {
        $request->validate([
            'crop_id'=> 'required|min:0',
            'cultivated_land'=> 'nullable',
            'actual_harvest_mt'=> 'nullable',
            'cultivated_date'=> 'required|date',
            'cultivation_changes_ha'=> 'nullable',
            'reason_for_changes'=> 'nullable',
            'total_retain_mt'=>'nullable',
            ]);

        $district->districtCultivation()->create([
            'crop_id'=> $request->crop_id,
            'cultivated_land'=> $request->cultivated_land,
            'actual_harvest_mt'=>$request->actual_harvest_mt,
            'cultivated_date'=> $request->cultivated_date,
            'cultivation_changes_ha'=> $request->cultivation_changes_ha,
            'reason_for_changes'=> $request->reason_for_changes,
            'total_retain'=>$request->total_retain,
            'total_retain_mt'=>$request->total_retain_mt
        ]);

        return redirect()->route('cultivation.index',$district->id)->with('success','Crop Added');
    }

    /**
     * Display the specified resource.
     */
    public function show(district $district,cropDistrict $cropDistrict)
    {
        // $crops = crop::all();
        // return view('crop-retain.edit',compact('district','crops','cropDistrict'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(district $district,cropDistrict $cultivation)
    {
        $crops = crop::all();
        return view('crop-retain.edit',compact('district','crops','cultivation'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(district $district, Request $request, cropDistrict $cultivation)
    {
        $request->validate([
            'crop_id'=> 'required|min:0',
            'cultivated_land'=> 'nullable',
            'actual_harvest_mt'=> 'nullable',
            'cultivated_date'=> 'required|date',
            'cultivation_changes_ha'=> 'nullable',
            'reason_for_changes'=> 'nullable',
            ]);

        $cultivation->update([
            'crop_id'=> $request->crop_id,
            'cultivated_land'=> $request->cultivated_land,
            'actual_harvest_mt'=>$request->actual_harvest_mt,
            'cultivated_date'=> $request->cultivated_date,
            'cultivation_changes_ha'=> $request->cultivation_changes_ha,
            'reason_for_changes'=> $request->reason_for_changes,
            'total_retain'=>$request->total_retain,
            'total_retain_mt'=>$request->total_retain_mt
        ]);

        return redirect()->route('cultivation.index',$district->id)->with('success','Crop update');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(district $district,cropDistrict $cropDistrict)
    {
        //
    }
}
