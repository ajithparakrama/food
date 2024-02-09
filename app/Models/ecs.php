<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ecs extends Model
{
    use HasFactory,SoftDeletes;
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
}
