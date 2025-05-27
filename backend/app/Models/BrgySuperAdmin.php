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
        'brgy_position',
        'position_status',
        'phone_number',
        'email',
        'profile_picture',
        'address',
        'password',
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
