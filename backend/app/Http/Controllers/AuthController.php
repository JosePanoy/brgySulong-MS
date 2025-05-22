<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BrgySuperAdmin;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'nullable|email',
            'phone_number' => 'nullable|numeric',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        if (!$request->has('email') && !$request->has('phone_number')) {
            return response()->json(['error' => 'Either email or phone_number is required'], 400);
        }

        $user = BrgySuperAdmin::where('email', $request->email)
            ->orWhere('phone_number', $request->phone_number)
            ->first();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Check if the password is hashed or plain text
        if (Hash::needsRehash($user->password)) {
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
            return response()->json([
                'token' => $token,
                'user' => [
                    'fname' => $user->fname,
                    'lname' => $user->lname,
                    'email' => $user->email,
                    'brgy_position' => $user->brgy_position,
                    'phone_number' => $user->phone_number,
                    'profile_picture' => $user->profile_picture,  
                    'address' => $user->address,  
                ]
            ]);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Could not create token'], 500);
        }
    }
}
