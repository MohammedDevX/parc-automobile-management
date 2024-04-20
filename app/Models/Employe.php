<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employe extends Model
{
    use HasFactory;

    protected $fillable = [
        'cin',
        'nom',
        'prenom',
        'genre',
        'date_naissance',
        'age',
        'tel',
        'adresse',
        'permis_conduire',
        'etat_employe',
        'email'
    ];

    public function Accidents() {
        return $this->hasMany(Accident::class, 'id');
    }

    public function Trajets() {
        return $this->hasMany(Trajet::class, 'id');
    }
}