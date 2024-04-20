<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAccidentRequest extends FormRequest
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
            'id' => 'required|exists:employes,id',
            'date_accident' => 'required|date',
            'lieu' => 'required',
            'degats' => 'required',
            'description' => 'required',
        ];
    }
}