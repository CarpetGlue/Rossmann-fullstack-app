<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Character extends Model
{
    protected $fillable = [
        'api_id',
        'name',
        'status',
        'species',
        'gender',
    ];

    public function episodes()
    {
        return $this->belongsToMany(Episode::class);
    }
}
