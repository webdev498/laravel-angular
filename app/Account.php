<?php namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Account extends Model
{
    use SoftDeletes;

    public $table = "accounts";

    public $primaryKey = "id";

    public $timestamps = true;

    public $fillable = [
      "provider",
      "provider_id",
      "user_id",
      "access_token",
      "refresh_token"
    ];

    public static $rules = [
      "provider" => "required",
      "provider_id" => "required",
      "user_id" => "required",
      "access_token" => "required"
    ];

    /**
     * establish relationship with User
     *
     * @return [type] [description]
     */
    public function user() {
      return $this->belongsTo('App\User');
    }
}
