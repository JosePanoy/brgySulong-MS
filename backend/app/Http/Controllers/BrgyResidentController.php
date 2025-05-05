<?php

namespace App\Http\Controllers;

use App\Models\BrgyResident;
use Illuminate\Http\Request;

class BrgyResidentController extends Controller
{
    public function index()
    {
        $residents = BrgyResident::all();
        return response()->json($residents);
    }

    public function store(Request $request)
    {
        $request->validate([
            'first_name'    => 'required|string|max:255',
            'last_name'     => 'required|string|max:255',
            'phone_number'  => 'required|string|max:15|unique:brgy_residents',
            'address'       => 'required|string|max:255',
            'email'         => 'required|email|unique:brgy_residents',
            'password'      => 'required|string|min:8',
        ]);

        $resident = BrgyResident::create([
            'first_name'    => $request->first_name,
            'last_name'     => $request->last_name,
            'phone_number'  => $request->phone_number,
            'address'       => $request->address,
            'email'         => $request->email,
            'password'      => bcrypt($request->password),
        ]);

        return response()->json($resident, 201);
    }
}
