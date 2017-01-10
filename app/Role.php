<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
	protected $guarded  = ['name'];

	/**
	 * establish relationship with users
	 * @return [type] [description]
	 */
	public function users()
	{
		return $this->hasMany('User');
	}
}
