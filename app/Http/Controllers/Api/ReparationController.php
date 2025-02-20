<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reparation;
use App\Http\Requests\StoreReparationRequest;
use App\Http\Requests\UpdateReparationRequest;
use App\Http\Resources\ReparationResource;
use Illuminate\Http\Request;

class ReparationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->query('filter', '');
        $query = Reparation::with(['vehicule']);

        if (!empty($search)) {
            $query->where(function ($query) use ($search) {
                $query->whereHas('Vehicule', function ($subQuery) use ($search) {
                    $subQuery->where('matricule', 'like', "%{$search}%");
                });
            });
        }

        return ReparationResource::collection(
            $query->orderBy('id_reparation', 'asc')->paginate(5)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReparationRequest $request)
    {
        $data = $request->validated();
        $reparation = Reparation::create($data);
        return response(new ReparationResource($reparation), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Reparation $reparation)
    {
        return new ReparationResource($reparation->load('vehicule'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReparationRequest $request, Reparation $reparation)
    {
        $data = $request->validated();
        $reparation->update($data);
        return new ReparationResource($reparation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reparation $reparation)
    {
        $reparation->delete();
        return response("", 204);
    }
}