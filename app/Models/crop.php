<?php

namespace App\Models;

use App\Models\cropDistrict;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class crop extends Model
{
    use HasFactory,SoftDeletes;
    protected $guarded = [];

    /**
     * Get the user that owns the crop
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function cropType()
    {
        return $this->belongsTo(cropType::class, 'crop_type_id');
    }

    public function cropDistrict(){
        return $this->hasMany(cropDistrict::class,'crop_id');
    }

    
}
