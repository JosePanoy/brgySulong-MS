<?php

namespace App\Http\Controllers;

use App\Models\BrgyExpenses;
use App\Models\BrgyInventory;
use Illuminate\Http\Request;

class BrgyExpensesController extends Controller
{
    
    public function index()
    {
        $expenses = BrgyExpenses::with('inventory')->paginate(10);
        return view('brgy_expenses.index', compact('expenses'));
    }


    public function create()
    {
        $inventories = BrgyInventory::all();
        return view('brgy_expenses.create', compact('inventories'));
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

        BrgyExpenses::create($data);

        return redirect()->route('brgy_expenses.index')->with('success', 'Expense recorded.');
    }

    public function show($id)
    {
        $expense = BrgyExpenses::with('inventory')->findOrFail($id);
        return view('brgy_expenses.show', compact('expense'));
    }


    public function edit($id)
    {
        $expense = BrgyExpenses::findOrFail($id);
        $inventories = BrgyInventory::all();
        return view('brgy_expenses.edit', compact('expense', 'inventories'));
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

        return redirect()->route('brgy_expenses.index')->with('success', 'Expense updated.');
    }


    public function destroy($id)
    {
        $expense = BrgyExpenses::findOrFail($id);
        $expense->delete();

        return redirect()->route('brgy_expenses.index')->with('success', 'Expense deleted.');
    }
}
