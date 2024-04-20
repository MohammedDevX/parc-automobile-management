<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reparation extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_reparation';

    protected $fillable = [
        'id_vehicule',
        'date_debut_reparation',
        'date_fin_reparation',
        'type',
        'description',
        'prix'
    ];

    public function Vehicule() {
        return $this->belongsTo(Vehicule::class, 'id_vehicule');
    }
}