<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Employe;
use App\Http\Requests\StoreEmployeRequest;
use App\Http\Requests\UpdateEmployeRequest;
use App\Http\Resources\EmployeResource;
use Illuminate\Http\Request;


class EmployeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->query('filter', '');

        $query = Employe::query();

        if (!empty($search)) {
            $query->where('nom', 'like', "%{$search}%")
                ->orWhere('prenom', 'like', "%{$search}%");
        }

        return EmployeResource::collection(
            $query->orderBy('id', 'asc')->paginate(5)
        );
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEmployeRequest $request)
    {
        $data = $request->validated();
        $employe = Employe::create($data);
        return response(new EmployeResource($employe), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Employe $employe)
    {
        return new EmployeResource($employe);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmployeRequest $request, Employe $employe)
    {
        $data = $request->validated();
        $employe->update($data);
        return new EmployeResource($employe);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employe $employe)
    {
        $employe->delete();
        return response("", 204);
    }

    public function allForDropdown()
    {
        $employe = Employe::all();
        return EmployeResource::collection($employe);
    }
}