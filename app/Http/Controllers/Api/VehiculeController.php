<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Vehicule;
use App\Http\Requests\StoreVehiculeRequest;
use App\Http\Requests\UpdateVehiculeRequest;
use App\Http\Resources\VehiculeResource;
use Illuminate\Http\Request;

class VehiculeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->query('filter', '');

        $query = Vehicule::query();

        if (!empty($search)) {
            $query->where('marque', 'like', "%{$search}%")
                ->orWhere('model', 'like', "%{$search}%")
                ->orWhere('matricule', 'like', "%{$search}%");
        }

        return VehiculeResource::collection(
            $query->with('categorie')->orderBy('id_vehicule', 'asc')->paginate(5)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVehiculeRequest $request)
    {
        $data = $request->validated();
        $vehicule = Vehicule::create($data);
        $vehicule->load('categorie');
        return response(new VehiculeResource($vehicule), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Vehicule $vehicule)
    {
        return new VehiculeResource($vehicule->load('categorie'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVehiculeRequest $request, Vehicule $vehicule)
    {
        $data = $request->validated();
        $vehicule->update($data);
        $vehicule->load('categorie');
        return new VehiculeResource($vehicule);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vehicule $vehicule)
    {
        $vehicule->delete();
        return response("", 204);
    }

    public function allForDropdown()
    {
        $vehicles = Vehicule::all();
        return VehiculeResource::collection($vehicles);
    }

    public function showVehicleDetails(Vehicule $vehicule)
    {
        // Load the vehicle with its related trips.
        $vehicule->load('Trajets');

        // Calculate the total distance travelled and fuel consumed.
        $totalDistance = $vehicule->Trajets->sum('environ_total');
        $totalFuelConsumed = $totalDistance * $vehicule->consommation_essence;

        // Count the total number of trips.
        $totalTrips = $vehicule->Trajets->count();

        // Return the data.
        return response()->json([
            'total_distance' => $totalDistance,
            'total_fuel_consumed' => $totalFuelConsumed,
            'total_trips' => $totalTrips,
        ]);
    }
}