<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Accident extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_accident';

    protected $fillable = [
        'id_vehicule',
        'id',
        'date_accident',
        'lieu',
        'degats',
        'description'
    ];

    public function Vehicule() {
        return $this->belongsTo(Vehicule::class, 'id_vehicule');
    }

    public function Employe() {
        return $this->belongsTo(Employe::class, 'id');
    }
}
