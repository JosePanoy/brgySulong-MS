<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BrgySuperAdmin; // Assuming you have a model for brgysuper_admins
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
 public function login(Request $request)
{
    // Validate input
    $validator = Validator::make($request->all(), [
        'email' => 'nullable|email',
        'phone_number' => 'nullable|numeric',
        'password' => 'required|string',
    ]);

    if ($validator->fails()) {
        return response()->json(['error' => $validator->errors()], 400);
    }

    // Ensure at least one of email or phone_number is provided
    if (!$request->has('email') && !$request->has('phone_number')) {
        return response()->json(['error' => 'Either email or phone_number is required'], 400);
    }

    // Find user by email or phone number in brgysuper_admins table
    $user = BrgySuperAdmin::where('email', $request->email)
        ->orWhere('phone_number', $request->phone_number)
        ->first();

    // Check if user exists
    if (!$user) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    // Check if the password is hashed or plain text
    if (Hash::needsRehash($user->password)) {
        // If the stored password needs rehashing, hash it (you can choose to rehash passwords upon login if desired)
        $user->password = Hash::make($user->password);
        $user->save();
    }

    // Now check the password using Hash::check
    if (!Hash::check($request->password, $user->password)) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    // Generate JWT token
    try {
        $token = JWTAuth::fromUser($user);
        return response()->json(['token' => $token]);
    } catch (JWTException $e) {
        return response()->json(['error' => 'Could not create token'], 500);
    }
}


}
