<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DashboardStatResource extends JsonResource
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
            'total_vehicules' => $this->total_vehicules,
            'total_employes' => $this->total_employes,
            'total_trajets' => $this->total_trajets,
            'months_accidents' => $this->months_accidents,
        ];
    }
}