<?php

namespace App\Http\Controllers;

use App\Models\BrgyInventory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;


class BrgyInventoryController extends Controller
{
    public function index()
    {
        $items = BrgyInventory::all();
        return response()->json($items);
    }

    public function store(Request $request)
    {
        $request->validate([
            'item_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'quantity_total' => 'required|integer|min:0',
            'quantity_available' => 'required|integer|min:0',
            'unit' => 'required|string|max:50',
            'condition_status' => 'required|in:Good,Damaged,Needs Repair',
            'last_maintenance_date' => 'nullable|date',
            'unique_identifier' => 'nullable|string|max:100',
            'status' => 'required|string|in:Active,Inactive',
            'acquisition_date' => 'nullable|date',
            'item_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:20480',
        ]);

        $data = $request->only([
            'item_name',
            'description',
            'quantity_total',
            'quantity_available',
            'unit',
            'condition_status',
            'last_maintenance_date',
            'unique_identifier',
            'status',
            'acquisition_date',
        ]);

        if ($request->hasFile('item_image')) {
            $data['item_image'] = $request->file('item_image')->store('inventory_img', 'public');
        } else {
            $data['item_image'] = null;
        }

        try {
            $item = BrgyInventory::create($data);
        } catch (\Exception $e) {
            Log::error('CREATE FAILED: ' . $e->getMessage());

            return response()->json([
                'message' => 'Failed to create inventory item.',
                'error' => $e->getMessage()
            ], 500);
        }


        return response()->json([
            'message' => 'Inventory item added.',
            'data' => $item
        ], 201);
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
            'item_image.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240',
        ]);

        if ($request->hasFile('item_image')) {
            // Delete old images if they exist
            if ($item->item_image) {
                $oldImages = json_decode($item->item_image, true);
                foreach ($oldImages as $oldPath) {
                    Storage::disk('public')->delete($oldPath);
                }
            }

            $newImagePaths = [];
            foreach ($request->file('item_image') as $image) {
                $newImagePaths[] = $image->store('inventory_img', 'public');
            }

            $data['item_image'] = json_encode($newImagePaths);
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

    public function search(Request $request)
    {
        $searchTerm = $request->input('query', '');

        $results = BrgyInventory::when($searchTerm, function ($q) use ($searchTerm) {
            $q->where(function ($query) use ($searchTerm) {
                $query->where('item_name', 'like', '%' . $searchTerm . '%')
                    ->orWhere('description', 'like', '%' . $searchTerm . '%');
            });
        })
            ->limit(5)
            ->get();

        return response()->json($results);
    }
}
