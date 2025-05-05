<?php

namespace App\Http\Controllers;

use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('phone_number', 'password');
        
        $user = User::where('phone_number', $request->phone_number)->first();
        
        if ($user && Hash::check($request->password, $user->password)) {
            if ($token = JWTAuth::attempt($credentials)) {
                return response()->json(['token' => $token]);
            }
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }
}
