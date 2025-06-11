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
            'diagnosis_details' => 'nullable|string',
            'diagnosis_status' => 'nullable|in:Ongoing,Recovered,Critical,Under Observation',
            'attending_physician' => 'nullable|string|max:255',
            'date_diagnosed' => 'nullable|date',
            'medications' => 'nullable|string|max:255',
            'last_checkup' => 'nullable|date',
            'medical_remarks' => 'nullable|string',
            'family_medical_history' => 'nullable|string',
            'medical_files' => 'nullable|string',
            'password' => 'required|string|min:8',
        ]);

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
            'diagnosis_details' => 'nullable|string',
            'diagnosis_status' => 'nullable|in:Ongoing,Recovered,Critical,Under Observation',
            'attending_physician' => 'nullable|string|max:255',
            'date_diagnosed' => 'nullable|date',
            'medications' => 'nullable|string|max:255',
            'last_checkup' => 'nullable|date',
            'medical_remarks' => 'nullable|string',
            'family_medical_history' => 'nullable|string',
            'medical_files' => 'nullable|string',
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


public function searchResident(Request $request)
{
    $query = $request->input('q');

    if (!$query) {
        return response()->json(['message' => 'Search query is required'], 400);
    }

    $queryLower = strtolower($query);
    $monthNames = [
        'january', 'february', 'march', 'april', 'may', 'june',
        'july', 'august', 'september', 'october', 'november', 'december'
    ];

    $residents = BrgyResident::where(function ($q) use ($query, $queryLower, $monthNames) {
        $q->where('fname', 'LIKE', "%{$query}%")
          ->orWhere('lname', 'LIKE', "%{$query}%")
          ->orWhere('phone_number', 'LIKE', "%{$query}%")
          ->orWhere('household_no', 'LIKE', "%{$query}%")
          ->orWhere('solo_parent', 'LIKE', "%{$query}%")
          ->orWhere('senior_citizen', 'LIKE', "%{$query}%");

        if (preg_match('/^\d{4}$/', $query)) {
            $q->orWhereRaw('YEAR(birthdate) = ?', [$query]);
        } else {
            foreach ($monthNames as $month) {
                if (strpos($month, $queryLower) !== false) {
                    $q->orWhereRaw('LOWER(MONTHNAME(birthdate)) LIKE ?', ["%{$queryLower}%"]);
                    break;
                }
            }
        }
    })
    ->get();

    return response()->json($residents);
}


}
