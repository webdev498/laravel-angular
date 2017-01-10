<?php

namespace App;

use App\Stat;
use App\User;
use Auth;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Stat extends Model {

	protected $fillable = array('*');

	protected $dates= ['last_login'];

	/**
	 * set login attribute, on save
	 * @param [type] $date [description]
	 */
	public function setLastLoginAttribute($date) {
		$this->attributes['last_login']=Carbon::parse($date);
	}

	/**
	 * get login attribute on retrieve
	 * @param  [type] $date [description]
	 * @return [type]       [description]
	 */
	public function getLastLoginAttribute($date) {
		return (new Carbon($date))->toDateTimeString();
	}

	/**
	 * Establish user relationship
	 * @return [type] [description]
	 */
	public function user() {
		return $this->belongsTo('User');
	}

	/**
	 * [lastLogin description]
	 * @return [type] [description]
	 */
	public static function lastLoginDate($user) {
		$stat=Stat::lastLoginStat($user);
		return ($stat && $stat->last_login) ? $stat->last_login : Carbon::now();
	}
	/**
	 * [lastLogin description]
	 * @return [type] [description]
	 */
	public static function lastLoginStat($user) {
		return Stat::where('user_id', $user)->latest('created_at')->first();
	}
}
