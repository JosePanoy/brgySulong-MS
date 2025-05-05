<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BrgyResidentController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;

Route::prefix('api')->group(function () {

    Route::get('residents', [BrgyResidentController::class, 'index']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('addresidents', [BrgyResidentController::class, 'store']);



    Route::get('test', function () {
        return response()->json(['message' => 'API is working!']);
    });

    // Protected route with JWT authentication
    Route::middleware('auth:api')->get('/user', function (Request $request) {
        return $request->user();
    });
});
