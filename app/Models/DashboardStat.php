<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DashboardStat extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_dashboard';
    
    protected $fillable = [
        'total_vehicules',
        'total_employes',
        'total_trajets',
        'todays_accidents'
    ];
}