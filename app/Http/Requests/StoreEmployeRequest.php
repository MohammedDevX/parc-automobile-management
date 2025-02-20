<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEmployeRequest extends FormRequest
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
            'cin' => "required|unique:employes,cin",
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'genre' => 'required|in:Homme,Femme',
            'date_naissance' => 'required|date',
            'age' => 'required',
            'tel' => 'required|string|min:10|max:15',
            'adresse' => 'required',
            'permis_conduire' => 'required|unique:employes,permis_conduire',
            'etat_employe' => 'required|string',
            'email' => 'required|email|unique:employes,email'
        ];
    }
}