<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class to_sm extends Model
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

         /**
     * Get the crop that owns the cropDistrict
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function crop()
    {
        return $this->belongsTo(crop::class, 'crop_id', 'id');
    }
}

