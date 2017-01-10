<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Log;
use Auth;
use App\User;
use App\Account;
use Facebook\Facebook;
use Facebook\FacebookRequest;

class ApiSearchController extends Controller
{
    protected $fb;

    /**
     * [__construct description].
     *
     * @param JWTAuth $auth [description]
     */
    public function __construct()
    {
        $this->fb = new Facebook([
          'app_id' => env('FACEBOOK_CLIENT_ID'),
          'app_secret' => env('FACEBOOK_CLIENT_SECRET'),
          'default_graph_version' => 'v2.5',
        ]);
    }

    public function search($value='')
    {
      // $request = new FacebookRequest(
      //   $session,
      //   'GET',
      //   'search?q='.$value.'type=event'
      // );
      // $response = $request->execute();
      // $graphObject = $response->getGraphObject();
      //start the session if needed
      if( session_id() ) {

      } else {
          session_start();
      }

      //get the user's access token
      $access_token = $this->fb->getAccessToken();
      $request = new FacebookRequest(
        $access_token,
        'GET',
        '/search?q='.$value.'&type=event&limit=10'
      );
      $response = $request->execute();
      $graphObject = $response->getGraphObject();
      // Log::info($value);
      // $search = $this->fb->api('/search?q='.$value.'&type=event&limit=10');
      dd($graphObject);
    }
}
