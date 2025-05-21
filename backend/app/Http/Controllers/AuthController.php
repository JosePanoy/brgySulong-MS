<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
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

        // Find user by email or phone number
        $user = User::where('email', $request->email)
            ->orWhere('phone_number', $request->phone_number)
            ->first();

        if (!$user || !Hash::check($request->password, $user->password)) {  
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
