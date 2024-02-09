<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class crop_types_districts extends Model
{
    use HasFactory;
    protected $guarded = [];

        /**
     * Get the district that owns the ecs
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function district()
    {
        return $this->belongsTo(district::class, 'district_id', 'id');
    }

    // public function cropType()
    // {
    //     return $this->belongsTo(cropType::class, 'type_id');
    // }
}