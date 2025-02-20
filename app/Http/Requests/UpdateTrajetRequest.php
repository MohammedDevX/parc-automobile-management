<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTrajetRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' => 'required|exists:employes,id',
            'id_vehicule' => 'required|exists:vehicules,id_vehicule',
            'type' => 'required',
            'lieu_debut_trajet' => 'required',
            'lieu_fin_trajet' => 'required',
            'environ_total' => 'required',
            'date_debut_trajet' => 'required|date',
            'date_fin_trajet' => 'required|date',
            'status' => 'required',
        ];
    }
}