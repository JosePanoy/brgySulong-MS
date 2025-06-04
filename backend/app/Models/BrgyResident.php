<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BrgyResident extends Model
{
 
    protected $fillable = [
        'fname',
        'lname',
        'phone_number',
        'email',
        'profile_picture',
        'address',
        'birthdate',
        'gender',
        'civil_status',
        'household_no',
        'is_household_head',
        'voter_status',
        'precinct_no',
        'pwd_status',
        'solo_parent',
        'senior_citizen',
        'employment_status',
        'education_level',
        'religion',
        'emergency_contact',
        'medical_conditions',
        'password',
    ];


    protected $hidden = [
        'password',
    ];


    protected $casts = [
        'birthdate' => 'date',
        'is_household_head' => 'boolean',
        'pwd_status' => 'boolean',
        'solo_parent' => 'boolean',
        'senior_citizen' => 'boolean',
    ];

 
    public function getFullNameAttribute()
    {
        return "{$this->fname} {$this->lname}";
    }
}
