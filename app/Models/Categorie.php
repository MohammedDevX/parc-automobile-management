<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_categorie';

    protected $fillable = [
        'category'
    ];

    public function Vehicules() {
        return $this->hasMany(Vehicule::class, 'id_categorie');
    }
}