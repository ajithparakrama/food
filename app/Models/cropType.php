<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class cropType extends Model
{
    use HasFactory,SoftDeletes;
    protected $guarded = []; 
    /**
     * Get all of the comments for the cropType
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function crop()
    {
        return $this->hasMany(crop::class, 'crop_type_id', 'id');
    }
}
