<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Tymon\JWTAuth\Contracts\JWTSubject;  // Import JWTSubject

class BrgySuperAdmin extends Model implements JWTSubject  // Implement JWTSubject interface
{
    use HasFactory;

    // Specify the table name
    protected $table = 'brgysuper_admins';

    /**
     * Get the identifier that will be stored in the JWT payload.
     * Typically, this is the primary key of the model.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();  // Return the primary key of the model
    }

    /**
     * Get the custom claims for the JWT.
     * This can be used to add additional information to the token's payload.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];  // Return an empty array for now, can be customized
    }
}
