<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Episode extends Model
{
    protected $fillable = [
        'api_id',
        'name',
        'air_date',
        'episode_code',
    ];

    protected $casts = [
        'air_date' => 'date',
    ];

    public function characters()
    {
        return $this->belongsToMany(Character::class);
    }
}
