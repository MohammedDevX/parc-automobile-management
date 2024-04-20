<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TrajetResource extends JsonResource
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
            'id_trajet' => $this->id_trajet,
            'vehicule' => new VehiculeResource($this->whenLoaded('vehicule')),
            'employe' => new EmployeResource($this->whenLoaded('employe')),
            'type' => $this->type,
            'lieu_debut_trajet' => $this->lieu_debut_trajet,
            'lieu_fin_trajet' => $this->lieu_fin_trajet,
            'environ_total' => $this->environ_total,
            'date_debut_trajet' => $this->date_debut_trajet,
            'date_fin_trajet' => $this->date_fin_trajet,
            'status' => $this->status,
        ];
    }
}