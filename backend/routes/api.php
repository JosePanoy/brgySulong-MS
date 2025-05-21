<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BrgyResidentController;
use App\Http\Controllers\BrgySuperAdminController;
use App\Http\Controllers\BarangayEventsController;
use App\Http\Controllers\AuthController;

// BrgySuperAdmin Routes
Route::prefix('brgysuper')->group(function () {
    Route::get('admins', [BrgySuperAdminController::class, 'index']);
    Route::get('admins/{id}', [BrgySuperAdminController::class, 'show']);
    Route::post('admins', [BrgySuperAdminController::class, 'store']);
    Route::put('admins/{id}', [BrgySuperAdminController::class, 'update']);
    Route::delete('admins/{id}', [BrgySuperAdminController::class, 'destroy']);
});

// BrgyResident Routes
Route::prefix('brgyresidents')->group(function () {
    Route::get('residents', [BrgyResidentController::class, 'index']);
    Route::get('residents/{id}', [BrgyResidentController::class, 'show']);
    Route::post('residents', [BrgyResidentController::class, 'store']);
    Route::put('residents/{id}', [BrgyResidentController::class, 'update']);
    Route::delete('residents/{id}', [BrgyResidentController::class, 'destroy']);
});

// Brgy Events Routes (Standalone)
Route::prefix('events')->group(function () {
    Route::get('/', [BarangayEventsController::class, 'index']);
    Route::get('{id}', [BarangayEventsController::class, 'show']);
    Route::post('/', [BarangayEventsController::class, 'store']);
    Route::put('{id}', [BarangayEventsController::class, 'update']);
    Route::delete('{id}', [BarangayEventsController::class, 'destroy']);
});


Route::post('login', [AuthController::class, 'login']);