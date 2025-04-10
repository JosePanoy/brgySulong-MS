<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BrgyResidentController;

Route::prefix('api')->group(function () {

    Route::get('residents', [BrgyResidentController::class, 'index']);
    Route::get('test', function () {
        return response()->json(['message' => 'API is working!']);
    });
    
});