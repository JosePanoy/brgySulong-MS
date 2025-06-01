<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BrgyEvent extends Model
{
    protected $primaryKey = 'event_id';

    public $incrementing = true;

    protected $keyType = 'int';

    protected $fillable = [
        'type',               // added to handle news or event type
        'title',
        'description',
        'category',
        'date_start',
        'date_end',
        'location',
        'organizer',
        'status',
        'image_url',
        'priority',
        'rsvp_required',
        'attendance_limit',
        'contact_person',
        'is_important',       // added to handle important flag
    ];
}
