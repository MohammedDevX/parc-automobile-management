<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateVehiculeRequest extends FormRequest
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
            'marque' => 'required',
            'model' => 'required',
            'consommation_essence' => 'required',
            'matricule' => "required|unique:vehicules,matricule,".$this->id_vehicule.',id_vehicule',
            'id_categorie' => 'required|exists:categories,id_categorie',
            'etat_de_vehicule' => 'required',
            'couleur_de_vehicule' => 'required'
        ];
    }
}