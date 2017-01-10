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
	 * [setLastLoginAttribute description]
	 * @param [type] $date [description]
	 */
	public function setLastLoginAttribute($date) {
		$this->attributes['last_login']=Carbon::parse($date);
	}

	/**
	 * [getLastLoginAttribute description]
	 * @param  [type] $date [description]
	 * @return [type]       [description]
	 */
	public function getLastLoginAttribute($date) {
		return (new Carbon($date))->toDateTimeString();
	}

	public function user() {
		return $this->belongsTo('User');
	}
}
