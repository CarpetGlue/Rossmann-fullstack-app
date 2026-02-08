<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Episode;
use Illuminate\Http\Request;

class EpisodeController extends Controller
{
    public function index(Request $request)
    {
        $query = Episode::with('characters');

        if ($request->filled('name')) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }

        if ($request->filled('date_from')) {
            $query->whereDate('air_date', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->whereDate('air_date', '<=', $request->date_to);
        }

        if ($request->filled('sort')) {
            $direction = $request->get('direction', 'asc');
            $query->orderBy($request->sort, $direction);
        }

        return response()->json(
            $query->paginate(10)
        );
    }
}
