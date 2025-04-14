<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BrgySuperAdmin extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'address',
        'brgy_position',
        'gender',
        'phone_number',
        'nickname',
        'password',
    ];
}