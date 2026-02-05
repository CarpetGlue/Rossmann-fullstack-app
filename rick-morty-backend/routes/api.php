<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\EpisodeController;

Route::get('/episodes', [EpisodeController::class, 'index']);
