<?php

namespace App;

use Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class Task extends Model
{
  protected $fillable=['user_id', 'title','notes','priority_id','status'];

  /**
   * establish relationship with priority
   * @return [type] [description]
   */
  public function priority()
  {
      return $this->belongsTo('App\Priority');
  }
    /**
   * establish relationship with tags
   * @return [type] [description]
   */
  public function tags() {
      return $this->belongsToMany('App\Tag');
  }

  /**
 *
 * enforce user cannot save a task that's not user's
 * @param  [type] $query [description
 * @return [type]        [description]
 */
  public function scopeOwn($query) {
    $query->where('user_id', Auth::id());
  }

  /**
 *
 * Query all tasks that are not done
 * @param  [type] $query [description
 * @return [type]        [description]
 */
  public function scopeTally($query) {
    $this->scopeOwn($query->own()->where('status', 0)->where('active', 1));
  }

  /**
   * new query to find all user's tasks
   * @param  [type] $id [description]
   * @return [type]     [description]
   */
  public static function findByUser($id) {
  $task=Task::where('id', $id)
      ->where('user_id', Auth::id())
      ->first();

      if (!$task){
          throw new ModelNotFoundException;
      }
      return $task;
  }

  /**
   * establish relationship with user
   * @return [type] [description]
   */
  public function user() {
    return $this->belongsTo('App\User');
  }
}
