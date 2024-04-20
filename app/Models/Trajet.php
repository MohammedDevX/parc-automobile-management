<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trajet extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_trajet';

    protected $fillable = [
        'id',
        'id_vehicule',
        'type',
        'lieu_debut_trajet',
        'lieu_fin_trajet',
        'environ_total',
        'date_debut_trajet',
        'date_fin_trajet',
        'status'
    ];

    public function Employe() {
        return $this->belongsTo(Employe::class, 'id');
    }

    public function Vehicule() {
        return $this->belongsTo(Vehicule::class, 'id_vehicule');
    }
}