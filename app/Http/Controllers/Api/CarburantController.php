<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Carburant;
use App\Http\Requests\StoreCarburantRequest;
use App\Http\Requests\UpdateCarburantRequest;
use App\Http\Resources\CarburantResource;
use Illuminate\Http\Request;

class CarburantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->query('filter', '');
        $query = Carburant::query();
        if (!empty($search)) {
            $query->where('prix_carburant', 'like', "%{$search}%");
        }
        return CarburantResource::collection(
            $query->orderBy('id_carburant', 'asc')->paginate(5)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCarburantRequest $request)
    {
        $data = $request->validated();
        $carburant = Carburant::create($data);
        return response(new CarburantResource($carburant), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Carburant $carburant)
    {
        return new CarburantResource($carburant);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCarburantRequest $request, Carburant $carburant)
    {
        $data = $request->validated();
        $carburant->update($data);
        return new CarburantResource($carburant);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Carburant $carburant)
    {
        $carburant->delete();
        return response("", 204);
    }


    public function getFirstEntry()
{
    $firstEntry = Carburant::orderBy('id_carburant', 'asc')->first();
    if (!$firstEntry) {
        return response()->json(['message' => 'No entries found'], 404);
    }
    return new CarburantResource($firstEntry);
}
}