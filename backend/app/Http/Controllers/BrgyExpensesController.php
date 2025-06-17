<?php

namespace App\Http\Controllers;

use App\Models\BrgyExpenses;
use App\Models\BrgyInventory;
use Illuminate\Http\Request;

class BrgyExpensesController extends Controller
{
    public function index()
    {
        $expenses = BrgyExpenses::with('inventory')->get();
        return response()->json($expenses);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'inventory_id' => 'nullable|exists:brgy_inventory,inventory_id',
            'expense_category' => 'required|in:Operational,Event,Relief,Capital',
            'description' => 'required|string',
            'quantity' => 'nullable|integer|min:0',
            'unit_cost' => 'nullable|numeric|min:0',
            'total_cost' => 'required|numeric|min:0',
            'vendor' => 'required|string|max:255',
            'payment_method' => 'required|string|max:100',
            'purchase_date' => 'required|date',
            'receipt_document' => 'nullable|string|max:255',
        ]);

        $expense = BrgyExpenses::create($data);

        return response()->json(['message' => 'Expense recorded.', 'data' => $expense], 201);
    }

    public function show($id)
    {
        $expense = BrgyExpenses::with('inventory')->findOrFail($id);
        return response()->json($expense);
    }

    public function update(Request $request, $id)
    {
        $expense = BrgyExpenses::findOrFail($id);

        $data = $request->validate([
            'inventory_id' => 'nullable|exists:brgy_inventory,inventory_id',
            'expense_category' => 'required|in:Operational,Event,Relief,Capital',
            'description' => 'required|string',
            'quantity' => 'nullable|integer|min:0',
            'unit_cost' => 'nullable|numeric|min:0',
            'total_cost' => 'required|numeric|min:0',
            'vendor' => 'required|string|max:255',
            'payment_method' => 'required|string|max:100',
            'purchase_date' => 'required|date',
            'receipt_document' => 'nullable|string|max:255',
        ]);

        $expense->update($data);

        return response()->json(['message' => 'Expense updated.', 'data' => $expense]);
    }
    public function destroy($id)
    {
        $expense = BrgyExpenses::findOrFail($id);
        $expense->delete();

        return response()->json(['message' => 'Expense deleted.']);
    }


    public function calculatedTotalCount()
    {
        $totalQuantity = BrgyExpenses::whereNotNull('quantity')->sum('quantity');
        $totalPesos = BrgyExpenses::sum('total_cost');

        return response()->json([
            'calculated_total_count' => $totalQuantity,
            'calculated_total_pesos' => number_format($totalPesos, 2, '.', ',')

        ]);
    }
}
