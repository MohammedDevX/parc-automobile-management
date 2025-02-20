<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicule extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_vehicule';

    protected $fillable = [
        'marque',
        'model',
        'consommation_essence',
        'matricule',
        'id_categorie',
        'etat_de_vehicule',
        'couleur_de_vehicule'
    ];

    public function categorie() {
        return $this->belongsTo(Categorie::class, 'id_categorie');
    }

    public function Accidents() {
        return $this->hasMany(Accident::class, 'id_vehicule');
    }

    public function Reparations() {
        return $this->hasMany(Reparation::class, 'id_vehicule');
    }

    public function Trajets() {
        return $this->hasMany(Trajet::class, 'id_vehicule');
    }
}
