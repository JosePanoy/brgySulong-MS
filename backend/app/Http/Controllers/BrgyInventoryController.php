<?php

namespace App\Http\Controllers;

use App\Models\BrgyInventory;
use Illuminate\Http\Request;

class BrgyInventoryController extends Controller
{
    
    public function index()
    {
        $items = BrgyInventory::paginate(10);
        return view('brgy_inventory.index', compact('items'));
    }

  
    public function create()
    {
        return view('brgy_inventory.create');
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
        ]);

        BrgyInventory::create($data);

        return redirect()->route('brgy_inventory.index')->with('success', 'Inventory item added.');
    }


    public function show($id)
    {
        $item = BrgyInventory::findOrFail($id);
        return view('brgy_inventory.show', compact('item'));
    }

    public function edit($id)
    {
        $item = BrgyInventory::findOrFail($id);
        return view('brgy_inventory.edit', compact('item'));
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
        ]);

        $item->update($data);

        return redirect()->route('brgy_inventory.index')->with('success', 'Inventory item updated.');
    }

    public function destroy($id)
    {
        $item = BrgyInventory::findOrFail($id);
        $item->delete();

        return redirect()->route('brgy_inventory.index')->with('success', 'Inventory item deleted.');
    }

    public function adjustStock(Request $request, $id)
    {
        $item = BrgyInventory::findOrFail($id);

        $data = $request->validate([
            'adjustment' => 'required|integer', 
        ]);

        $newQuantity = $item->quantity_available + $data['adjustment'];
        if ($newQuantity < 0) {
            return back()->withErrors('Adjustment exceeds available stock.');
        }

        $item->quantity_available = $newQuantity;
        $item->save();

        return redirect()->route('brgy_inventory.show', $id)->with('success', 'Stock quantity adjusted.');
    }
}
