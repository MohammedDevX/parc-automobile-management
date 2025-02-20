<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
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
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,'.$this->id,
            'password' => 'required',
            'password' => 'required',
            'cin' => 'required|unique:users,cin,'.$this->id,
            'prenom' => 'required|string',
            'genre' => 'required|in:Homme,Femme',
            'date_naissance' => 'required|date',
            'age' => 'required',
            'tel' => 'required|string|min:10|max:15',
            'adresse' => 'required|string',
        ];
    }
}