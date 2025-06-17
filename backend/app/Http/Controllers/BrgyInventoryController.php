<?php

namespace App\Http\Controllers;

use App\Models\BrgyInventory;
use Illuminate\Http\Request;

class BrgyInventoryController extends Controller
{
    // Get all inventory items (API)
    public function index()
    {
        $items = BrgyInventory::all();
        return response()->json($items);
    }

    // Store a new inventory item
    public function store(Request $request)
    {
        $data = $request->validate([
            'item_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'quantity_total' => 'required|integer|min:0',
            'quantity_available' => 'required|integer|min:0',
            'unit' => 'required|string|max:50',
            'condition_status' => 'required|in:Good,Damaged,Needs Repair',
            'last_maintenance_date' => 'nullable|date',
            'unique_identifier' => 'nullable|string|max:100',
        ]);

        $item = BrgyInventory::create($data);

        return response()->json(['message' => 'Inventory item added.', 'data' => $item], 201);
    }

    // Show a specific inventory item
    public function show($id)
    {
        $item = BrgyInventory::findOrFail($id);
        return response()->json($item);
    }

    // Update an inventory item
    public function update(Request $request, $id)
    {
        $item = BrgyInventory::findOrFail($id);

        $data = $request->validate([
            'item_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'quantity_total' => 'required|integer|min:0',
            'quantity_available' => 'required|integer|min:0',
            'unit' => 'required|string|max:50',
            'condition_status' => 'required|in:Good,Damaged,Needs Repair',
            'last_maintenance_date' => 'nullable|date',
            'unique_identifier' => 'nullable|string|max:100',
        ]);

        $item->update($data);

        return response()->json(['message' => 'Inventory item updated.', 'data' => $item]);
    }

    // Delete an inventory item
    public function destroy($id)
    {
        $item = BrgyInventory::findOrFail($id);
        $item->delete();

        return response()->json(['message' => 'Inventory item deleted.']);
    }

    // Adjust available stock
    public function adjustStock(Request $request, $id)
    {
        $item = BrgyInventory::findOrFail($id);

        $data = $request->validate([
            'adjustment' => 'required|integer',
        ]);

        $newQuantity = $item->quantity_available + $data['adjustment'];

        if ($newQuantity < 0) {
            return response()->json(['error' => 'Adjustment exceeds available stock.'], 400);
        }

        $item->quantity_available = $newQuantity;
        $item->save();

        return response()->json(['message' => 'Stock quantity adjusted.', 'data' => $item]);
    }

    // Real-Time Stock Count (sum of quantity_available)
    public function stockCount()
    {
        $totalAvailable = BrgyInventory::sum('quantity_available');
        return response()->json(['real_time_stock_count' => $totalAvailable]);
    }

    // real time count of condition item
    public function conditionCounts()
{
    $counts = BrgyInventory::selectRaw("condition_status, COUNT(*) as total")
        ->groupBy('condition_status')
        ->get()
        ->pluck('total', 'condition_status');

    return response()->json([
        'Good' => $counts->get('Good', 0),
        'Needs Repair' => $counts->get('Needs Repair', 0),
    ]);
}

}
