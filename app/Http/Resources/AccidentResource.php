<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AccidentResource extends JsonResource
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
            'id_accident' => $this->id_accident,
            'vehicule' => new VehiculeResource($this->whenLoaded('vehicule')),
            'employe' => new EmployeResource($this->whenLoaded('employe')),
            'date_accident' => $this->date_accident,
            'lieu' => $this->lieu,
            'degats' => $this->degats,
            'description' => $this->description,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}
