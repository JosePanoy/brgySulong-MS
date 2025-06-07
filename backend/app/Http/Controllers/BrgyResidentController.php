<?php

namespace App\Http\Controllers;

use App\Models\BrgyResident;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class BrgyResidentController extends Controller
{
    public function index()
    {
        $residents = BrgyResident::all();
        return response()->json($residents);
    }

    public function show($id)
    {
        $resident = BrgyResident::find($id);

        if (!$resident) {
            return response()->json(['message' => 'Resident not found'], 404);
        }

        return response()->json($resident);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'fname' => 'required|string',
            'lname' => 'required|string',
            'age' => 'required|string',
            'phone_number' => 'required|string',
            'email' => 'required|email|unique:brgy_residents,email',
            'profile_picture' => 'nullable|string',
            'address' => 'required|string',
            'birthdate' => 'nullable|date',
            'gender' => 'nullable|in:Male,Female,Other',
            'civil_status' => 'nullable|in:Single,Married,Widowed,Divorced',
            'household_no' => 'nullable|string|max:50',
            'is_household_head' => 'nullable|boolean',
            'voter_status' => 'nullable|in:Registered,Not Registered',
            'precinct_no' => 'nullable|string|max:50',
            'pwd_status' => 'nullable|boolean',
            'solo_parent' => 'nullable|boolean',
            'senior_citizen' => 'nullable|boolean',
            'employment_status' => 'nullable|string|max:100',
            'education_level' => 'nullable|string|max:100',
            'religion' => 'nullable|string|max:100',
            'emergency_contact' => 'nullable|string|max:255',
            'medical_conditions' => 'nullable|string',
            'password' => 'required|string|min:8',
        ]);

        // Hash password before saving
        $validated['password'] = Hash::make($validated['password']);

        $resident = BrgyResident::create($validated);
        return response()->json($resident, 201);
    }

    public function update(Request $request, $id)
    {
        $resident = BrgyResident::find($id);

        if (!$resident) {
            return response()->json(['message' => 'Resident not found'], 404);
        }

        $validated = $request->validate([
            'fname' => 'nullable|string',
            'lname' => 'nullable|string',
            'age' => 'nullable|string',
            'phone_number' => 'nullable|string',
            'email' => 'nullable|email|unique:brgy_residents,email,' . $id,
            'profile_picture' => 'nullable|string',
            'address' => 'nullable|string',
            'birthdate' => 'nullable|date',
            'gender' => 'nullable|in:Male,Female,Other',
            'civil_status' => 'nullable|in:Single,Married,Widowed,Divorced',
            'household_no' => 'nullable|string|max:50',
            'is_household_head' => 'nullable|boolean',
            'voter_status' => 'nullable|in:Registered,Not Registered',
            'precinct_no' => 'nullable|string|max:50',
            'pwd_status' => 'nullable|boolean',
            'solo_parent' => 'nullable|boolean',
            'senior_citizen' => 'nullable|boolean',
            'employment_status' => 'nullable|string|max:100',
            'education_level' => 'nullable|string|max:100',
            'religion' => 'nullable|string|max:100',
            'emergency_contact' => 'nullable|string|max:255',
            'medical_conditions' => 'nullable|string',
            'password' => 'nullable|string|min:8',
        ]);

        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $resident->update($validated);
        return response()->json($resident);
    }

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
