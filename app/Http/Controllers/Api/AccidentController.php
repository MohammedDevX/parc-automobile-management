<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Accident;
use App\Http\Requests\StoreAccidentRequest;
use App\Http\Requests\UpdateAccidentRequest;
use App\Http\Resources\AccidentResource;
use Illuminate\Http\Request;

class AccidentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->query('filter', '');
        $query = Accident::with(['vehicule', 'employe']);

        if (!empty($search)) {
            $query->where(function ($query) use ($search) {
                $query->whereHas('Vehicule', function ($subQuery) use ($search) {
                    $subQuery->where('matricule', 'like', "%{$search}%");
                })
                    ->orWhereHas('Employe', function ($subQuery) use ($search) {
                        $subQuery->where('nom', 'like', "%{$search}%")
                            ->orWhere('prenom', 'like', "%{$search}%");
                    });
            });
        }

        return AccidentResource::collection(
            $query->orderBy('id_accident', 'asc')->paginate(5)
        );
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAccidentRequest $request)
    {
        $data = $request->validated();
        $accident = Accident::create($data);
        return response(new AccidentResource($accident), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Accident $accident)
    {
        return new AccidentResource($accident->load(['vehicule', 'employe']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAccidentRequest $request, Accident $accident)
    {
        $data = $request->validated();
        $accident->update($data);
        return new AccidentResource($accident);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Accident $accident)
    {
        $accident->delete();
        return response("", 204);
    }
}