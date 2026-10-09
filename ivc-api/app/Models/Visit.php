<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Visit extends Model
{
    protected $fillable = ['visited_on', 'visitor', 'path', 'referrer', 'device', 'hits'];
}
