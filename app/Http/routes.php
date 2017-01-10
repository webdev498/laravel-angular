<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

// Health check
Route::get('/', function () {
  return response()->json(array('success' => true));
});

// API Protected
Route::group(['prefix' => 'v1/api', 'middleware' => 'cors'], function(){
Route::get('search/{value}', 'ApiSearchController@search');
  Route::group(['middleware' => 'jwt.auth'], function(){
    Route::resource('tasks', 'TaskController');
    Route::get('/user/me',  ['uses' => 'UserAuthController@getAuthenticatedUser', 'as' => 'user.get.auth']);
    Route::get('/tasks/tally',  ['uses' => 'TaskController@getTally', 'as' => 'tally.get']);
  });
  // user auth
  Route::post('/register',  ['uses' => 'UserAuthController@register', 'as' => 'user.register']);
  Route::post('/signin',  ['uses' => 'UserAuthController@signin', 'as' => 'user.signin']);
  Route::post('/logout',  ['uses' => 'UserAuthController@logout', 'as' => 'user.logout']);
  // social authentication
  Route::get('auth/callback/{provider}', 'UserAuthController@handleProviderCallback');
  Route::get('auth/with/{provider}', 'UserAuthController@redirectToProvider');
});
