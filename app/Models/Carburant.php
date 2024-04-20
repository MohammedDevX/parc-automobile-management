<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Carburant extends Model
{
    use HasFactory;

    protected $table = 'carburant';

    protected $primaryKey = 'id_carburant';

    protected $fillable = [
        'prix_carburant'
    ];
}