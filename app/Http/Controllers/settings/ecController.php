<?php

namespace App\Http\Controllers\settings;

use App\DataTables\ecDataTable;
use App\Http\Controllers\Controller;
use App\Models\district;
use App\Models\ecs;
use Illuminate\Http\Request;

class ecController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(ecDataTable $DataTable)
    {
        return $DataTable->render("settings.ec.index");
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $districts = district::all();
        return view("settings.ec.create", compact("districts"));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "name"=> "required|min:1|max:255|unique:ecs,name",
            "district_id"=> "required|min:1",
        ]);

        ecs::create($request->all());

        return redirect()->route("ecs.index")->with("success","Success fully created EC");

    }

    /**
     * Display the specified resource.
     */
    public function show(ecs $ec)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ecs  $ec)
    {
        $districts = District::all();
        return view("settings.ec.edit", compact("ec","districts"));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ecs $ec)
    {
        $request->validate([
            "name"=> "required|min:1|max:255|unique:ecs,name,".$ec->id,
            "district_id"=> "required|min:1",
        ]);
        
        $ec->update($request->all());
        
        return redirect()->route("ecs.index")->with("success","EC updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ecs  $ec)
    {
        $ec->delete();
        return redirect()->route("ecs.index")->with("success","Ec Delted");
    }
}
