<?php

namespace App\Http\Controllers\settings;

use App\DataTables\cropDataTable;
use App\Http\Controllers\Controller;
use App\Models\crop;
use App\Models\cropType;
use Illuminate\Http\Request;

class cropController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(cropDataTable $DataTable)
    {
        return $DataTable->render("settings.crop.index");
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $cropTypes =cropType::all();
        return view("settings.crop.create", compact("cropTypes"));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "name"=> "required|min:1|max:250|unique:crops,name",
            "crop_type_id"=> "required|min:1"
            ]);
            $cropType = crop::create($request->all());
            return redirect()->route("crop.index")->with("success","Crop created");
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
    public function edit(crop $crop)
    {
        $cropTypes = cropType::all();
        
        return view("settings.crop.edit", compact("crop","cropTypes"));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, crop  $crop)
    {
        $request->validate([
            "name"=> "required|min:1|max:250|unique:crops,name,".$crop->id,
            "crop_type_id"=> "required|min:1"
        ]);

        $crop->update($request->all());
        return redirect()->route("crop.index")->with("success","Crop updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(crop $crop)
    {
        $crop->delete();
        return redirect()->route("crop.index")->with("success","Crop Deleted");
    }
}
