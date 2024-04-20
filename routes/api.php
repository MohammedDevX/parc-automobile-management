<?php

use App\Http\Controllers\Api\AccidentController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CarburantController;
use App\Http\Controllers\Api\CategorieController;
use App\Http\Controllers\Api\DashboardStatController;
use App\Http\Controllers\Api\EmployeController;
use App\Http\Controllers\Api\ReparationController;
use App\Http\Controllers\Api\TrajetController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\VehiculeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('/employes', EmployeController::class);
    Route::get('/employe', [EmployeController::class, 'allForDropdown']);
    Route::apiResource('/categories', CategorieController::class);
    Route::apiResource('/vehicules', VehiculeController::class);
    Route::get('/vehicule', [VehiculeController::class, 'allForDropdown']);
    Route::apiResource('/accidents', AccidentController::class);
    Route::apiResource('/reparations', ReparationController::class);
    Route::apiResource('/trajets', TrajetController::class);
    Route::apiResource('/carburant', CarburantController::class);
    Route::get('/carburants', [CarburantController::class, 'getFirstEntry']);
    Route::apiResource('/users', UserController::class);
    Route::apiResource('/dashboards', DashboardStatController::class);
    Route::get('/essence', [DashboardStatController::class, 'getMonthlyFuelConsumptions']);
    Route::get('/reparationsprix', [DashboardStatController::class, 'getMonthlyReparationsCost']);
    Route::get('/vehicules/{vehicule}/details', [VehiculeController::class, 'showVehicleDetails']);
});

Route::post('/login', [AuthController::class, 'login']);