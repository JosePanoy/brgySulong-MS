<?php

namespace App\Http\Controllers;

use App\Models\BrgySuperAdmin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;



class BrgySuperAdminController extends Controller
{

    public function index()
    {
        $admins = BrgySuperAdmin::all();
        return response()->json($admins);
    }


    public function show($id)
    {
        $admin = BrgySuperAdmin::find($id);

        if (!$admin) {
            return response()->json(['message' => 'Super Admin not found'], 404);
        }

        return response()->json($admin);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'fname' => 'required|string',
            'lname' => 'required|string',
            'brgy_position' => 'required|string',
            'phone_number' => 'required|string',
            'email' => 'required|email|unique:brgysuper_admins,email',
            'profile_picture' => 'nullable|string',
            'address' => 'required|string',
            'password' => 'required|string|min:8',
        ]);

        $admin = BrgySuperAdmin::create($validated);
        return response()->json($admin, 201);
    }


public function update(Request $request, $id)
{
    $admin = BrgySuperAdmin::find($id);
    if (!$admin) {
        return response()->json(['message' => 'Super Admin not found'], 404);
    }

    $validated = $request->validate([
        'fname' => 'nullable|string',
        'lname' => 'nullable|string',
        'brgy_position' => 'nullable|string',
        'position_status' => 'nullable|string',
        'phone_number' => 'nullable|string',
        'email' => 'nullable|email|unique:brgysuper_admins,email,' . $id,
        'address' => 'nullable|string',
        'password' => 'nullable|string|min:8',
        'profile_picture' => 'nullable|image|mimes:jpeg,jpg,png|max:10240',
        'term_start_date' => 'nullable|date',
        'term_end_date' => 'nullable|date|after_or_equal:term_start_date',
        'appointed_by' => 'nullable|string',
    ]);

    if ($request->hasFile('profile_picture')) {
        $file = $request->file('profile_picture');
        $fileName = time() . '_' . $file->getClientOriginalName();
        $filePath = $file->storeAs('profile_pictures', $fileName, 'public');

        if ($admin->profile_picture && Storage::disk('public')->exists($admin->profile_picture)) {
            Storage::disk('public')->delete($admin->profile_picture);
        }

        $admin->profile_picture = $filePath;
    }

    if (!empty($validated['password'])) {
        $admin->password = bcrypt($validated['password']);
    }

    $fieldsToUpdate = [
        'fname', 'lname', 'brgy_position', 'position_status',
        'phone_number', 'email', 'address',
        'term_start_date', 'term_end_date', 'appointed_by'
    ];

    foreach ($fieldsToUpdate as $field) {
        if (array_key_exists($field, $validated)) {
            $admin->$field = $validated[$field] ?? null;
        }
    }

    $admin->save();

    return response()->json($admin);
}


    // Delete a super admin by ID
    public function destroy($id)
    {
        $admin = BrgySuperAdmin::find($id);

        if (!$admin) {
            return response()->json(['message' => 'Super Admin not found'], 404);
        }

        $admin->delete();
        return response()->json(['message' => 'Super Admin deleted successfully']);
    }
}
