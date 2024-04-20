<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Accident;
use App\Models\Employe;
use App\Models\Trajet;
use App\Models\Vehicule;
use Illuminate\Support\Facades\DB;

class DashboardStatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $accidentsPerMonth = Accident::select(
            DB::raw('MONTH(created_at) as month'),
            DB::raw('COUNT(*) as count')
        )
            ->groupBy('month')
            ->get()
            ->keyBy('month');
        // Calculate the total number of vehicles
        $totalVehicles = Vehicule::count();

        // Calculate the total number of employees
        $totalEmployees = Employe::count();

        // Calculate the total number of trips

        $trajetsPerMonth = Trajet::select(
            DB::raw('MONTH(created_at) as month'),
            DB::raw('COUNT(*) as count')
        )
            ->groupBy('month')
            ->get()
            ->keyBy('month');

        // Return the aggregated data as a JSON response
        return response()->json([
            'total_vehicules' => $totalVehicles,
            'total_employes' => $totalEmployees,
            'total_trajets' => $trajetsPerMonth,
            'months_accidents' => $accidentsPerMonth,
        ]);
    }

    public function getMonthlyFuelConsumption()
    {
        $monthlyFuelData = DB::table('trajets')
            ->join('vehicules', 'trajets.id_vehicule', '=', 'vehicles.id')
            ->select(
                DB::raw('YEAR(trips.date) as year'),
                DB::raw('MONTH(trips.date) as month'),
                DB::raw('SUM(trips.distance * vehicles.consumption_per_km) as total_fuel')
            )
            ->groupBy('year', 'month')
            ->orderBy('year', 'asc')
            ->orderBy('month', 'asc')
            ->get();

        return response()->json($monthlyFuelData);
    }

    public function getMonthlyFuelConsumptions()
    {
        $monthlyFuelData = DB::table('trajets')
            ->join('vehicules', 'trajets.id_vehicule', '=', 'vehicules.id_vehicule')
            ->select(
                DB::raw('YEAR(trajets.date_debut_trajet) as year'),
                DB::raw('MONTH(trajets.date_debut_trajet) as month'),
                DB::raw('SUM(trajets.environ_total * vehicules.consommation_essence) as total_fuel')
            )
            ->groupBy('year', 'month')
            ->orderBy('year', 'asc')
            ->orderBy('month', 'asc')
            ->get();

        return response()->json($monthlyFuelData);
    }

    public function getMonthlyReparationsCost()
    {
        $monthlyReparationsCost = DB::table('reparations')
            ->select(
                DB::raw('YEAR(date_debut_reparation) as year'),
                DB::raw('MONTH(date_debut_reparation) as month'),
                DB::raw('SUM(prix) as total_reparation_cost')
            )
            ->groupBy('year', 'month')
            ->orderBy('year', 'asc')
            ->orderBy('month', 'asc')
            ->get();

        return response()->json($monthlyReparationsCost);
    }
}