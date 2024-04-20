<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReparationResource extends JsonResource
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
            'id_reparation' => $this->id_reparation,
            'vehicule' => new VehiculeResource($this->whenLoaded('vehicule')),
            'date_debut_reparation' => $this->date_debut_reparation,
            'date_fin_reparation' => $this->date_fin_reparation,
            'type' => $this->type,
            'description' => $this->description,
            'prix' => $this->prix,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}