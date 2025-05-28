<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Tymon\JWTAuth\Contracts\JWTSubject;

class BrgySuperAdmin extends Model implements JWTSubject
{
    use HasFactory;

    protected $table = 'brgysuper_admins';

    protected $fillable = [
        'fname',
        'lname',
        'age',
        'brgy_position',
        'position_status',
        'phone_number',
        'email',
        'address',
        'password',
        'profile_picture',
        'term_start_date',
        'term_end_date',
        'appointed_by',
        'last_edited_by',  
    ];

    // Add this casts property:
    protected $casts = [
        'last_edited_by' => 'array',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
