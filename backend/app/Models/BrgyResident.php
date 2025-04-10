<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BrgyResident extends Model
{
    use HasFactory;

    protected $table = 'brgy_residents';
    protected $fillable = ['first_name', 'last_name', 'phone_number', 'address', 'email', 'password'];
}
