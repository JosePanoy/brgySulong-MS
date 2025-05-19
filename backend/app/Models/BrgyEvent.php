<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BrgyEvent extends Model
{
    // Specify the custom primary key column
    protected $primaryKey = 'event_id';

    // Optionally, if you're not using the default incrementing behavior:
    public $incrementing = true;

    // Optionally, specify the data type of the primary key (usually an integer)
    protected $keyType = 'int';

    // Your existing fillable attributes...
    protected $fillable = [
        'title', 'description', 'category', 'date_start', 'date_end', 'location',
        'organizer', 'status', 'image_url', 'priority', 'rsvp_required',
        'attendance_limit', 'contact_person'
    ];
}

