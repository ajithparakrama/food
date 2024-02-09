<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class fromEcs extends Model
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

    public function crop()
    {
        return $this->belongsTo(crop::class, 'crop_id', 'id');
    }

    public function ecs()
    {
        return $this->belongsTo(ecs::class, 'ecs_id', 'id');
    }
}
