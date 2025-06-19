<?php

namespace App\Http\Controllers;

use App\Models\BrgyInventory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class BrgyInventoryController extends Controller
{
    public function index()
    {
        $items = BrgyInventory::all();
        return response()->json($items);
    }

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
            'item_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('item_image')) {
            $data['item_image'] = $request->file('item_image')->store('inventory_img', 'public');
        }

        $item = BrgyInventory::create($data);
        return response()->json(['message' => 'Inventory item added.', 'data' => $item], 201);
    }

    public function show($id)
    {
        $item = BrgyInventory::findOrFail($id);
        return response()->json($item);
    }

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
            'item_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240',
        ]);

        if ($request->hasFile('item_image')) {
            if ($item->item_image) {
                Storage::disk('public')->delete($item->item_image);
            }
            $data['item_image'] = $request->file('item_image')->store('inventory_img', 'public');
        }

        $item->update($data);
        return response()->json(['message' => 'Inventory item updated.', 'data' => $item]);
    }

    public function destroy($id)
    {
        $item = BrgyInventory::findOrFail($id);
        if ($item->item_image) {
            Storage::disk('public')->delete($item->item_image);
        }
        $item->delete();
        return response()->json(['message' => 'Inventory item deleted.']);
    }

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

    public function stockCount()
    {
        $totalAvailable = Cache::remember('real_time_stock_count', 2, function () {
            return BrgyInventory::sum('quantity_available');
        });

        return response()->json(['real_time_stock_count' => $totalAvailable]);
    }

    public function conditionCounts()
    {
        $counts = Cache::remember('condition_item_counts', 2, function () {
            return BrgyInventory::selectRaw("condition_status, COUNT(*) as total")
                ->groupBy('condition_status')
                ->get()
                ->pluck('total', 'condition_status');
        });

        return response()->json([
            'Good' => $counts->get('Good', 0),
            'Needs Repair' => $counts->get('Needs Repair', 0),
        ]);
    }
}
