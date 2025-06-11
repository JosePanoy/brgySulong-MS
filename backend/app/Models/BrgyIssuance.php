<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BrgyIssuance extends Model
{
    use HasFactory;

    protected $table = 'brgy_issuance';

    protected $primaryKey = 'issuance_id';

    protected $fillable = [
        'inventory_id',
        'issued_to',
        'position',
        'purpose',
        'quantity_issued',
        'date_issued',
        'expected_return',
        'date_returned',
        'remarks',
    ];

    protected $dates = [
        'date_issued',
        'expected_return',
        'date_returned',
        'created_at',
        'updated_at',
    ];

  
    public function inventory()
    {
        return $this->belongsTo(BrgyInventory::class, 'inventory_id', 'inventory_id');
    }
}
