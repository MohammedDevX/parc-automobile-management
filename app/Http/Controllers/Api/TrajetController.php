<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Trajet;
use App\Http\Requests\StoreTrajetRequest;
use App\Http\Requests\UpdateTrajetRequest;
use App\Http\Resources\TrajetResource;
use Illuminate\Http\Request;

class TrajetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->query('filter', '');
        $query = Trajet::with([
            'employe' => function($query) {
                $query->where('etat_employe', 'Disponible');
            },
            'vehicule' => function($query) {
                $query->where('etat_de_vehicule', 'Disponible');
            }
        ]);

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

        return TrajetResource::collection(
            $query->orderBy('id_trajet', 'asc')->paginate(5)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTrajetRequest $request)
    {
        $data = $request->validated();
        $trajet = Trajet::create($data);
        return response(new TrajetResource($trajet), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Trajet $trajet)
    {
        return new TrajetResource($trajet->load(['vehicule', 'employe']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTrajetRequest $request, Trajet $trajet)
    {
        $data = $request->validated();
        $trajet->update($data);
        return new TrajetResource($trajet);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Trajet $trajet)
    {
        $trajet->delete();
        return response("", 204);
    }
}