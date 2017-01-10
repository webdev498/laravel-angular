<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
  protected $fillable=['name'];

  /**
   * Establish Tasks relationship
   * @return [type] [description]
   */
  public function tasks()
  {
    return $this->belongsToMany('App\Task');
  }
}
