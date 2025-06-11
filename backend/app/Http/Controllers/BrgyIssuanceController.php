<?php

namespace App\Http\Controllers;

use App\Models\BrgyIssuance;
use App\Models\BrgyInventory;
use Illuminate\Http\Request;

class BrgyIssuanceController extends Controller
{

    public function index()
    {
        $issuances = BrgyIssuance::with('inventory')->paginate(10);
        return view('brgy_issuance.index', compact('issuances'));
    }

    public function create()
    {
        $inventories = BrgyInventory::where('quantity_available', '>', 0)->get();
        return view('brgy_issuance.create', compact('inventories'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'inventory_id' => 'required|exists:brgy_inventory,inventory_id',
            'issued_to' => 'required|string|max:255',
            'position' => 'required|string|max:100',
            'purpose' => 'required|string|max:255',
            'quantity_issued' => 'required|integer|min:1',
            'date_issued' => 'required|date',
            'expected_return' => 'nullable|date|after_or_equal:date_issued',
            'remarks' => 'nullable|string',
        ]);

        $inventory = BrgyInventory::findOrFail($data['inventory_id']);

        if ($inventory->quantity_available < $data['quantity_issued']) {
            return back()->withErrors('Not enough stock available.');
        }

        BrgyIssuance::create($data);

        $inventory->quantity_available -= $data['quantity_issued'];
        $inventory->save();

        return redirect()->route('brgy_issuance.index')->with('success', 'Issuance recorded and stock updated.');
    }

    public function show($id)
    {
        $issuance = BrgyIssuance::with('inventory')->findOrFail($id);
        return view('brgy_issuance.show', compact('issuance'));
    }

    public function edit($id)
    {
        $issuance = BrgyIssuance::findOrFail($id);
        $inventories = BrgyInventory::all();
        return view('brgy_issuance.edit', compact('issuance', 'inventories'));
    }
    public function update(Request $request, $id)
    {
        $issuance = BrgyIssuance::findOrFail($id);

        $data = $request->validate([
            'inventory_id' => 'required|exists:brgy_inventory,inventory_id',
            'issued_to' => 'required|string|max:255',
            'position' => 'required|string|max:100',
            'purpose' => 'required|string|max:255',
            'quantity_issued' => 'required|integer|min:1',
            'date_issued' => 'required|date',
            'expected_return' => 'nullable|date|after_or_equal:date_issued',
            'date_returned' => 'nullable|date|after_or_equal:date_issued',
            'remarks' => 'nullable|string',
        ]);

        $qtyDifference = $data['quantity_issued'] - $issuance->quantity_issued;

        $inventory = BrgyInventory::findOrFail($data['inventory_id']);

        if ($qtyDifference > 0 && $inventory->quantity_available < $qtyDifference) {
            return back()->withErrors('Not enough stock available for update.');
        }

        if ($data['inventory_id'] != $issuance->inventory_id) {

            $oldInventory = BrgyInventory::findOrFail($issuance->inventory_id);
            $oldInventory->quantity_available += $issuance->quantity_issued;
            $oldInventory->save();

            $inventory->quantity_available -= $data['quantity_issued'];
            $inventory->save();
        } else {
            $inventory->quantity_available -= $qtyDifference;
            $inventory->save();
        }

        $issuance->update($data);

        return redirect()->route('brgy_issuance.index')->with('success', 'Issuance record updated.');
    }

  
    public function destroy($id)
    {
        $issuance = BrgyIssuance::findOrFail($id);

       
        $inventory = BrgyInventory::findOrFail($issuance->inventory_id);
        $inventory->quantity_available += $issuance->quantity_issued;
        $inventory->save();

        $issuance->delete();

        return redirect()->route('brgy_issuance.index')->with('success', 'Issuance record deleted and stock restored.');
    }
}
