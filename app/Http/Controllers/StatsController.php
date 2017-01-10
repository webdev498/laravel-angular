<?php

namespace App\Http\Controllers;

use Auth;
use App\Stat;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Http\Requests\TodoRequest;
use App\Http\Controllers\Controller;

class ApiRequestsController extends Controller {

	/**
	 * Get all the user stats on user login/logout
	 * @param  Request $request Htttp Get
	 * @return JSon response           All the stats
	 */
	function getStats(Request $request) {

    $allowed_columns = ['last_login', 'ip'];
    $sort = in_array($request->input('sort'), $allowed_columns) ? $request->input('sort') : 'user_id';
    $order = $request->input('order') === 'asc' ? 'asc' : 'desc';
    $stats = Stat::orderBy($sort, $order)->get();
    return  response()->json($stats)->setCallback($request->input('callback'));
	}

}
