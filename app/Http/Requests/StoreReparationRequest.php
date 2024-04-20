<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReparationRequest extends FormRequest
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
            'id_vehicule' => 'required|exists:vehicules,id_vehicule',
            'date_debut_reparation' => 'required|date',
            'date_fin_reparation' => 'required|date',
            'type' => 'required',
            'description' => 'required',
            'prix' => 'required',
        ];
    }
}