<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VehiculeResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id_vehicule' => $this->id_vehicule,
            'marque' => $this->marque,
            'model' => $this->model,
            'consommation_essence' => $this->consommation_essence,
            'matricule' => $this->matricule,
            'id_categorie' => $this->id_categorie, 
            'categorie' => new CategorieResource($this->whenLoaded('categorie')),
            'etat_de_vehicule' => $this->etat_de_vehicule,
            'couleur_de_vehicule' => $this-> couleur_de_vehicule,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}
