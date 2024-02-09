<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class district extends Model
{
    use HasFactory;
    protected $guarded = [];

    
    /**
     * Get all of the comments for the district
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function districtCultivation()
    {
        return $this->hasMany(cropDistrict::class, 'district_id', 'id');
    }


    public function toDistrict()
    {
        return $this->hasMany(toDistricts::class, 'district_id', 'id');
    }

    public function toEcs(){
        return $this->hasMany(to_ecs::class, 'district_id', 'id');
    }

 


    public function fromDistrict()
    {
        return $this->hasMany(toDistricts::class, 'district_id', 'id');
    }

    /**
     * Get all of the comments for the district
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function toSm()
    {
        return $this->hasMany(to_sm::class, 'district_id', 'id');
    }

    /**
     * Get all of the comments for the district
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function fromEcs()
    {
        return $this->hasMany(fromEcs::class, 'district_id', 'id');
    }

     /**
     * Get all of the comments for the district
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function fromSm()
    {
        return $this->hasMany(fromSm::class, 'district_id', 'id');
    }

    
}
