<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'Bakhtaoui',
            'email' => 'achraf@gmail.com',
            'password' => Hash::make('123456789'),
            'cin' => 'ZG17102',
            'prenom' => 'Achraf',
            'genre' => 'Homme',
            'date_naissance' => '2001-01-01',
            'age' => '22',
            'tel' => '0651582256',
            'adresse' => 'LOT INRAHIM NR 60 GUERCIF',
        ]);
    }
}