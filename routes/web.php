<?php

use App\Http\Controllers\ajaxController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ToSmController;
use App\Http\Controllers\ToEcsController;
use App\Http\Controllers\FromSmController;
use App\Http\Controllers\FromEcsController;
use App\Http\Controllers\ToDistrictsController;
use App\Http\Controllers\settings\ecController; 
use App\Http\Controllers\FromDistrictsController;
use App\Http\Controllers\settings\cropController;
use App\Http\Controllers\settings\cropTypeController;
use App\Http\Controllers\settings\districtController;
use App\Http\Controllers\CropTypesDistrictsController;
use App\Http\Controllers\CropDistrictCultivationController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Auth::routes();






Route::group(['middleware' => ['auth']], function () {


    Route::resource('district', districtController::class)->names('district');
    Route::prefix('district/{district}')->group(function () {
        Route::resource('cultivation', CropDistrictCultivationController::class)->names('cultivation');
        Route::resource('type', CropTypesDistrictsController::class)->names('type');

        Route::resource('to-district', ToDistrictsController::class)->names('to-district');
        Route::resource('to-ecs', ToEcsController::class)->names('to-ecs');
        Route::resource('to-sm', ToSmController::class)->names('to-sm');

   //     Route::resource('from-district', FromDistrictsController::class)->names('from-district');
        Route::resource('from-ecs', FromEcsController::class)->names('from-ecs');
        Route::resource('from-sm', FromSmController::class)->names('from-sm');

    });

    Route::prefix('settings')->group(function () { 
         Route::resource('crop-type', cropTypeController::class)->names('crop-type');
         Route::resource('ecs', ecController::class)->names('ecs');
         Route::resource('crop', cropController::class)->names('crop');
     });



     Route::get('ajax/harvest/',[ajaxController::class,'getFoodBalance'])->name('ajax.get-food-balance');
 
});

