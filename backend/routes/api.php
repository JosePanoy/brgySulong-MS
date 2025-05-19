<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BrgySuperAdminController;
use App\Http\Controllers\BrgyResidentController;

// Group routes under the "brgyms" prefix
Route::prefix('brgyms')->group(function () {

    // Routes for BrgySuperAdmin
    Route::get('super_admin', [BrgySuperAdminController::class, 'index']); // Get all super admins
    Route::get('super_admin/{id}', [BrgySuperAdminController::class, 'show']); // Get a super admin by ID
    Route::post('super_admin', [BrgySuperAdminController::class, 'store']); // Create a new super admin
    Route::put('super_admin/{id}', [BrgySuperAdminController::class, 'update']); // Update a super admin by ID
    Route::delete('super_admin/{id}', [BrgySuperAdminController::class, 'destroy']); // Delete a super admin by ID

    // Routes for BrgyResident
    Route::get('residents', [BrgyResidentController::class, 'index']); // Get all residents
    Route::get('residents/{id}', [BrgyResidentController::class, 'show']); // Get a resident by ID
    Route::post('residents', [BrgyResidentController::class, 'store']); // Create a new resident
    Route::put('residents/{id}', [BrgyResidentController::class, 'update']); // Update a resident by ID
    Route::delete('residents/{id}', [BrgyResidentController::class, 'destroy']); // Delete a resident by ID
});
