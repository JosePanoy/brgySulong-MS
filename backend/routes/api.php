<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BrgyResidentController;
use App\Http\Controllers\BrgySuperAdminController;
use App\Http\Controllers\BarangayEventsController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BrgyInventoryController;
use App\Http\Controllers\BrgyIssuanceController;
use App\Http\Controllers\BrgyExpensesController;

// BrgySuperAdmin Routes
Route::prefix('brgysuper')->group(function () {
    Route::get('admins', [BrgySuperAdminController::class, 'index']);
    Route::get('admins/{id}', [BrgySuperAdminController::class, 'show']);
    Route::post('admins', [BrgySuperAdminController::class, 'store']);
    Route::match(['put', 'post'], 'admins/{id}', [BrgySuperAdminController::class, 'update']);
    Route::delete('admins/{id}', [BrgySuperAdminController::class, 'destroy']);
});

// BrgyResident Routes
Route::prefix('brgyresidents')->group(function () {
    Route::get('residents', [BrgyResidentController::class, 'index']);
    Route::get('residents/{id}', [BrgyResidentController::class, 'show']);
    Route::post('residents', [BrgyResidentController::class, 'store']);
    Route::put('residents/{id}', [BrgyResidentController::class, 'update']);
    Route::delete('residents/{id}', [BrgyResidentController::class, 'destroy']);
    Route::get('search', [BrgyResidentController::class, 'searchResident']);
});

// Brgy Events Routes
Route::prefix('events')->group(function () {
    Route::get('/', [BarangayEventsController::class, 'index']);
    Route::get('{id}', [BarangayEventsController::class, 'show']);
    Route::post('/', [BarangayEventsController::class, 'store']);
    Route::put('{event_id}', [BarangayEventsController::class, 'update']);
    Route::delete('{id}', [BarangayEventsController::class, 'destroy']);
});

// Brgy Inventory Routes
Route::prefix('inventory')->group(function () {
    Route::get('/', [BrgyInventoryController::class, 'index']);
    Route::get('{id}', [BrgyInventoryController::class, 'show']);
    Route::post('/', [BrgyInventoryController::class, 'store']);
    Route::put('{id}', [BrgyInventoryController::class, 'update']);
    Route::delete('{id}', [BrgyInventoryController::class, 'destroy']);
    Route::post('{id}/adjust-stock', [BrgyInventoryController::class, 'adjustStock']); // for stock adjustment
});

// Brgy Issuance Routes
Route::prefix('issuance')->group(function () {
    Route::get('/', [BrgyIssuanceController::class, 'index']);
    Route::get('{id}', [BrgyIssuanceController::class, 'show']);
    Route::post('/', [BrgyIssuanceController::class, 'store']);
    Route::put('{id}', [BrgyIssuanceController::class, 'update']);
    Route::delete('{id}', [BrgyIssuanceController::class, 'destroy']);
});

// Brgy Expenses Routes
Route::prefix('expenses')->group(function () {
    Route::get('/', [BrgyExpensesController::class, 'index']);
    Route::get('{id}', [BrgyExpensesController::class, 'show']);
    Route::post('/', [BrgyExpensesController::class, 'store']);
    Route::put('{id}', [BrgyExpensesController::class, 'update']);
    Route::delete('{id}', [BrgyExpensesController::class, 'destroy']);
});

Route::post('/login', [AuthController::class, 'login']);

Route::get('/test-update/{id}', function ($id) {
    $admin = \App\Models\BrgySuperAdmin::find($id);
    if (!$admin) return response()->json(['msg' => 'Not found'], 404);
    $admin->fname = 'TestUpdated';
    $admin->save();
    return response()->json($admin);
});
