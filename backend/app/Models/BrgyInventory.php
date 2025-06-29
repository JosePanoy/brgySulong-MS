<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class BrgyInventory extends Model
{
    use HasFactory;

    protected $table = 'brgy_inventory';

    protected $primaryKey = 'inventory_id';

    protected $fillable = [
        'item_name',
        'description',
        'item_image',
        'quantity_total',
        'quantity_available',
        'unit',
        'condition_status',
        'last_maintenance_date',
        'unique_identifier',
        'status',             
        'acquisition_date',
    ];

    protected $dates = [
        'last_maintenance_date',
        'acquisition_date',
        'created_at',
        'updated_at',
    ];
}
