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
}
