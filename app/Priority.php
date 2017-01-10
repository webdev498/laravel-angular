<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Priority extends Model
{
  protected $fillable=['name'];

  /**
   * Establish rationship with tasks
   * @return [type] [description]
   */
  public function tasks()
  {
      return $this->hasMany('App\Task');
  }
}
