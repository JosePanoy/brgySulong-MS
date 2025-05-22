<?php

namespace App\Http\Controllers;

use App\Models\BrgySuperAdmin;
use Illuminate\Http\Request;

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
            'phone_number' => 'nullable|string',
            'email' => 'nullable|email|unique:brgysuper_admins,email,' . $id,
            'profile_picture' => 'nullable|string',
            'address' => 'nullable|string',
            'password' => 'nullable|string|min:8',
        ]);

        $admin->update($validated);
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
