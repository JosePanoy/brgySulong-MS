<?php

namespace App\Http\Controllers;

use App\Models\BrgyIssuance;
use App\Models\BrgyInventory;
use Illuminate\Http\Request;

class BrgyIssuanceController extends Controller
{
    public function index()
    {
        $issuances = BrgyIssuance::with('inventory')->get();
        return response()->json($issuances);
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
            return response()->json(['error' => 'Not enough stock available.'], 400);
        }

        $issuance = BrgyIssuance::create($data);
        $inventory->quantity_available -= $data['quantity_issued'];
        $inventory->save();

        return response()->json(['message' => 'Issuance recorded.', 'data' => $issuance], 201);
    }

    public function show($id)
    {
        $issuance = BrgyIssuance::with('inventory')->findOrFail($id);
        return response()->json($issuance);
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
            return response()->json(['error' => 'Not enough stock available for update.'], 400);
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

        return response()->json(['message' => 'Issuance record updated.', 'data' => $issuance]);
    }

    public function destroy($id)
    {
        $issuance = BrgyIssuance::findOrFail($id);
        $inventory = BrgyInventory::findOrFail($issuance->inventory_id);

        $inventory->quantity_available += $issuance->quantity_issued;
        $inventory->save();

        $issuance->delete();

        return response()->json(['message' => 'Issuance record deleted and stock restored.']);
    }

    // ✅ Overdue Returns Count
    public function overdueCount()
    {
        $overdue = BrgyIssuance::whereNotNull('expected_return')
            ->whereNull('date_returned')
            ->where('expected_return', '<', now()->toDateString())
            ->sum('quantity_issued');

        return response()->json(['overdue_return_count' => $overdue]);
    }
}
