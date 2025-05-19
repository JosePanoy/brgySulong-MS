<?php

namespace App\Http\Controllers;

use App\Models\BrgyResident;
use Illuminate\Http\Request;

class BrgyResidentController extends Controller
{
    // Display all residents
    public function index()
    {
        $residents = BrgyResident::all();
        return response()->json($residents);
    }

    // Show a specific resident by ID
    public function show($id)
    {
        $resident = BrgyResident::find($id);

        if (!$resident) {
            return response()->json(['message' => 'Resident not found'], 404);
        }

        return response()->json($resident);
    }

    // Create a new resident
    public function store(Request $request)
    {
        $validated = $request->validate([
            'fname' => 'required|string',
            'lname' => 'required|string',
            'phone_number' => 'required|string',
            'email' => 'required|email|unique:brgy_residents,email',
            'profile_picture' => 'nullable|string',
            'address' => 'required|string',
            'password' => 'required|string|min:8',
        ]);

        $resident = BrgyResident::create($validated);
        return response()->json($resident, 201);
    }

    // Update an existing resident by ID
    public function update(Request $request, $id)
    {
        $resident = BrgyResident::find($id);

        if (!$resident) {
            return response()->json(['message' => 'Resident not found'], 404);
        }

        $validated = $request->validate([
            'fname' => 'nullable|string',
            'lname' => 'nullable|string',
            'phone_number' => 'nullable|string',
            'email' => 'nullable|email|unique:brgy_residents,email,' . $id,
            'profile_picture' => 'nullable|string',
            'address' => 'nullable|string',
            'password' => 'nullable|string|min:8',
        ]);

        $resident->update($validated);
        return response()->json($resident);
    }

    // Delete a resident by ID
    public function destroy($id)
    {
        $resident = BrgyResident::find($id);

        if (!$resident) {
            return response()->json(['message' => 'Resident not found'], 404);
        }

        $resident->delete();
        return response()->json(['message' => 'Resident deleted successfully']);
    }
}
