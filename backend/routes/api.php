<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BrgyResidentController;
use App\Http\Controllers\BrgySuperAdminController;

// BrgySuperAdmin Routes
Route::prefix('brgysuper')->group(function() {
    Route::get('admins', [BrgySuperAdminController::class, 'index']);
    Route::get('admins/{id}', [BrgySuperAdminController::class, 'show']);
    Route::post('admins', [BrgySuperAdminController::class, 'store']);
    Route::put('admins/{id}', [BrgySuperAdminController::class, 'update']);
    Route::delete('admins/{id}', [BrgySuperAdminController::class, 'destroy']);
});

// BrgyResident Routes
Route::prefix('brgyresidents')->group(function() {
    Route::get('residents', [BrgyResidentController::class, 'index']);
    Route::get('residents/{id}', [BrgyResidentController::class, 'show']);
    Route::post('residents', [BrgyResidentController::class, 'store']);
    Route::put('residents/{id}', [BrgyResidentController::class, 'update']);
    Route::delete('residents/{id}', [BrgyResidentController::class, 'destroy']);
});
