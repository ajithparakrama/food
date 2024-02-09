<?php

namespace App\Http\Controllers\settings;

use App\DataTables\cropTypeDataTable;
use App\Http\Controllers\Controller;
use App\Models\cropType;
use Illuminate\Http\Request;

class cropTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(cropTypeDataTable $dataTable)
    {
    return $dataTable->render('settings.crop-type.index');        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('settings.crop-type.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'=> 'required|min:1|max:255|unique:crop_types,name'
            ]); 
           
            cropType::create($request->all());
            return redirect()->route('crop-type.index')->with('success','Crop type saved');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(cropType $crop_type)
    {
        return view('settings.crop-type.edit', compact('crop_type'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, cropType $crop_type)
    {
        $request->validate([
             'name'=> 'required|min:1|max:255|unique:crop_types,name,'.$crop_type->id	
            ]);

            $crop_type->update($request->all());
            return redirect()->route('crop-type.index')->with('success','Crop type upated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(cropType $crop_type)
    {
        $crop_type->delete();
        return redirect()->route('crop-type.index')->with('success','Deleted');
    }
}
