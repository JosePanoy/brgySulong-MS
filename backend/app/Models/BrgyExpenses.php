<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BrgyExpenses extends Model
{
    use HasFactory;

    protected $table = 'brgy_expenses';

    protected $primaryKey = 'expense_id';

    protected $fillable = [
        'inventory_id',
        'expense_category',
        'description',
        'quantity',
        'unit_cost',
        'total_cost',
        'vendor',
        'payment_method',
        'purchase_date',
        'receipt_document',
    ];

    protected $dates = [
        'purchase_date',
        'created_at',
        'updated_at',
    ];

    // Relationship: Expense optionally belongs to an inventory item
    public function inventory()
    {
        return $this->belongsTo(BrgyInventory::class, 'inventory_id', 'inventory_id');
    }
}
