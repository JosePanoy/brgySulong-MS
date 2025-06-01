<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

use App\Models\BrgyEvent;

class BarangayEventsController extends Controller
{


    public function index()
    {
        return response()->json(BrgyEvent::all(), 200);
    }


    public function show($id)
    {
        $event = BrgyEvent::find($id);

        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        return response()->json($event, 200);
    }

public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'type' => 'required|in:Event,News',
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'category' => 'nullable|string|max:100',
        'date_start' => 'nullable|date',
        'date_end' => [
            'nullable',
            'date',
            function ($attribute, $value, $fail) use ($request) {
                if ($request->date_start && strtotime($value) < strtotime($request->date_start)) {
                    $fail('The date end must be a date after or equal to date start.');
                }
            },
        ],
        'location' => 'nullable|string|max:255',
        'organizer' => 'nullable|string|max:100',
        'status' => 'nullable|in:Scheduled,Ongoing,Completed,Cancelled',
        'image_url' => 'nullable|string|max:255',
        'priority' => 'nullable|in:High,Medium,Low',
        'rsvp_required' => 'nullable|boolean',
        'attendance_limit' => 'nullable|integer|min:1',
        'contact_person' => 'nullable|string|max:100'
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    try {
        $data = $validator->validated();

        $data['status'] = $data['status'] ?? 'Scheduled';
        $data['priority'] = $data['priority'] ?? 'Medium';
        $data['rsvp_required'] = isset($data['rsvp_required']) ? (bool)$data['rsvp_required'] : false;

        if ($data['type'] === 'News') {
            $data['date_start'] = null;
            $data['date_end'] = null;
            $data['location'] = null;
            $data['organizer'] = null;
            $data['status'] = 'Scheduled';
            $data['rsvp_required'] = false;
            $data['attendance_limit'] = null;
            $data['contact_person'] = null;
        }

        $event = BrgyEvent::create($data);

        return response()->json($event, 201);

    } catch (\Exception $e) {
        return response()->json(['error' => 'Server error: ' . $e->getMessage()], 500);
    }
}






public function update(Request $request, $event_id)
{
    $event = BrgyEvent::find($event_id);
    if (!$event) {
        return response()->json(['message' => 'Event not found'], 404);
    }

    $validator = Validator::make($request->all(), [
        'title' => 'sometimes|required|string|max:255',
        'description' => 'nullable|string',
        'category' => 'nullable|string|max:100',
        'date_start' => 'sometimes|required|date',
        'date_end' => 'nullable|date|after_or_equal:date_start',
        'location' => 'nullable|string|max:255',
        'organizer' => 'nullable|string|max:100',
        'status' => 'in:Scheduled,Ongoing,Completed,Cancelled',
        'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:15360',
        'priority' => 'in:High,Medium,Low',
        'rsvp_required' => 'boolean',
        'attendance_limit' => 'nullable|integer|min:1',
        'contact_person' => 'nullable|string|max:100',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    $validated = $validator->validated();

    if ($request->hasFile('image_file')) {
        $image = $request->file('image_file');
        $filename = time() . '_' . preg_replace('/\s+/', '_', $image->getClientOriginalName());
        $filePath = $image->storeAs('brgy_news_img', $filename, 'public');

        if ($event->image_url) {
            $oldImagePath = str_replace('storage/', '', $event->image_url);
            if (Storage::disk('public')->exists($oldImagePath)) {
                Storage::disk('public')->delete($oldImagePath);
            }
        }

        $validated['image_url'] = 'storage/' . $filePath;
    }

    $event->fill($validated);
    $event->save();

    return response()->json($event, 200);
}



    public function destroy($id)
    {
        $event = BrgyEvent::find($id);

        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        $event->delete();

        return response()->json(['message' => 'Event deleted successfully'], 200);
    }
}
