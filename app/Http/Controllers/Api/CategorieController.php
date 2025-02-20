<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategorieResource;
use App\Models\Categorie;
use App\Http\Requests\StoreCategorieRequest;
use App\Http\Requests\UpdateCategorieRequest;
use Illuminate\Http\Request;

class CategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->query('filter', '');
        $query = Categorie::query();
        if (!empty($search)) {
            $query->where('category', 'like', "%{$search}%");
        }
        return CategorieResource::collection(
            $query->orderBy('id_categorie', 'asc')->paginate(5)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategorieRequest $request)
    {
        $data = $request->validated();
        $categorie = Categorie::create($data);
        return response(new CategorieResource($categorie), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $categorie = Categorie::find($id);
        return new CategorieResource($categorie);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategorieRequest $request, $id)
    {
        $categorie = Categorie::find($id);
        $data = $request->validated();
        $categorie->update($data);
        return new CategorieResource($categorie);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $categorie = Categorie::find($id);
        $categorie->delete();
        return response("", 204);
    }
}