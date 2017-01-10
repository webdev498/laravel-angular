<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Log;
use Auth;
use App\User;
use Socialite;
use App\Account;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\JWTAuth;
use App\Http\Requests\UserRequest;
use App\Events\UserLoginEvent;
use App\Events\UserLogoutEvent;

class UserAuthController extends Controller
{
    protected $auth;

    /**
     * [__construct description].
     *
     * @param JWTAuth $auth [description]
     */
    public function __construct(JWTAuth $auth)
    {
        $this->auth = $auth;
    }

    /**
     * [signin description].
     *
     * @param Request $request Http
     *
     * @return JSon_Codes or token   400/401/500
     */
    public function signin(Request $request)
    {
        Log::info("[App\UserAuthController]: Attempt login");

        // grab credentials from the request
        $credentials = $request->only('email', 'password');

        try {

            // attempt to verify the credentials and create a token for the user
            if (!$token = $this->auth->attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        Log::info("[App\UserAuthController]: Login event fired");
        event(new UserLoginEvent(Auth::user()));

        // all good so return the token
        return response()->json(compact('token'));
    }

    /**
     * Log user out.
     *
     * @param Request $request Log user out
     *
     * @return JSon_Codes 400/401/500
     */
    public function logout(Request $request)
    {
        Log::info("[App\UserAuthController]: Logout event fired");
        Log::info($this->getAuthenticatedUser());

        // $user=User::where('id', $request->user );
        // event(new UserLogoutEvent($user));

        Log::info("[App\UserAuthController]: Attempt logout");
        Auth::logout();

        return response()->json(array('success' => true));
    }

    /**
     * Get user whose token is in header, and auth user.
     *
     * @param Request $request HTTP
     *
     * @return JSON user object
     */
    public function getAuthenticatedUser()
    {
        Log::info("[App\UserAuthController]: Get authenticated user");
        $user = $this->auth->parseToken()->authenticate();

        Log::info(Auth::user()->id);
        return response()->json(compact('user'));
    }

    /**
     * Register User.
     *
     * @param UserRequest $request HTTP
     *
     * @return JSon_Codes 400/401/500
     */
    public function register(UserRequest $request)
    {
        Log::info("[App\UserAuthController]: Register new user");
        // Get user credentials
        $credentials = $request->only('name', 'email', 'password');
        $credentials[ 'password' ] = bcrypt($credentials[ 'password' ]);

        try {
            // Try to create user based on credentials provided
            $user = User::create($credentials);
        } catch (Exception $e) {
            return response()->json(['error' => 'User already exists.'], HttpResponse::HTTP_CONFLICT);
        }

        // If user has social Element, create an accout for fuser
        if (isset($request['provider']) && isset($request['provider_id']) && isset($request['provider_token'])) {
          $user->accounts()->save(new Account([
              'provider' => $request['provider'],
              'provider_id' => $request['provider_id'],
              'access_token' => $request['provider_token'],
          ]));
        }

        // Return user credentials for immediate login
        $token = $this->auth->fromUser($user);

        return response()->json(compact('token'));
    }

    /**
     * Rediret function for social auth.
     *
     * @param string $provider type of provider ex: Facebook
     *
     * @return Link callback
     */
    public function redirectToProvider($provider)
    {
        Log::info("[App\UserAuthController]: Redirect new social user");
        return Socialite::with($provider)->redirect();
    }

    /**
     * Obtain the user information from provider ex:Facebook.
     *
     * @return Response
     */
    public function handleProviderCallback($provider, Request $request)
    {
        Log::info("[App\UserAuthController]: Handle new social user");

        // try to find the account who wants to login or register
        $social_user = Socialite::driver($provider)->user();
        $social_account = Account::where('provider', $provider)->where('provider_id', $social_user->id)->first();
        $social_avatar = str_replace('normal', 'large', $social_user->avatar);
        // if the account exists, either answer with a redirect or return the access token
        // this decision is made when we are checking if the request is an AJAX request
        Log::info($provider);
        Log::info($social_avatar);

        if ($social_account) {
            $user = $social_account->user;
            $this->handleAvatar($user,$social_avatar);

            Log::info("[App\UserAuthController]: Login event fired");
            event(new UserLoginEvent($user));
            if (!$request->ajax()) {
                return redirect(env('FRONTED_URL').'/#/register?token='.$this->auth->fromUser($user), 302);
            }

            return response($this->auth->fromUser($user), 200);
        }

        // there is the use case where user exist but wants to login using social account.
        // similar to the previous use case, account fo AJAX request
        if ($social_user) {
            $user_exists = User::where('email', $social_user->user['email'])->first();
            $this->handleAvatar($user,$social_avatar);

            if ($user_exists) {
                if (isset($provider) && isset($social_user->id) && isset($social_user->token)) {
                    $user_exists->accounts()->save(new Account([
                        'provider' => $provider,
                        'provider_id' => $social_user->id,
                        'access_token' => $social_user->token,
                    ]));
                }
                Log::info("[App\UserAuthController]: Login event fired");
                event(new UserLoginEvent($user_exists));
                if (!$request->ajax()) {
                    return redirect(env('FRONTED_URL').'/#/register?token='.$this->auth->fromUser($user_exists), 302);
                }

                return response($this->auth->fromUser($user_exists), 200);
          }
      }

      Log::info("[App\UserAuthController]: No Social Account exists, creation begins");
      // the account does not exist yet.
      // redirect to frontend, if user is coming per link, adding contents for form fields
      if (!$request->ajax()) {
          return redirect(env('FRONTED_URL').
              '/#/register?first_name='.$social_user->user['first_name'].
              '&last_name='.$social_user->user['last_name'].
              '&email='.$social_user->user['email'].
              '&gender='.(('male' === $social_user->user['gender']) ? 'm' : 'f').
              '&provider='.$provider.
              '&provider_id='.$social_user->id.
              '&provider_token='.$social_user->token, 302);
        }

        // otherwise return the data as json
        return response(array(
        'first_name' => $social_user->user['first_name'],
        'last_name' => $social_user->user['last_name'],
        'email' => $social_user->user['email'],
        'gender' => (('male' === $social_user->user['gender']) ? 'm' : 'f'),
        'provider' => $provider,
        'provider_id' => $social_user->id,
        'provider_token' => $social_user->token,
        ), 200);
    }

    function generateRandomString($length = 10) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }
    function handleAvatar($user,$avatar){
      $old_avatar=$user->avatar;
      $old_file = fopen(public_path().'/img/avatars/'.$old_avatar, 'w+');

      if($avatar){
        $data = file_get_contents($avatar);
        if ($old_file){
          $fileName = $old_avatar;
        }else{
        $fileName = $this->generateRandomString(12).'.jpg';
        }
          $file=fopen(public_path().'/img/avatars/'.$fileName, 'w+');
        fputs($file, $data);
        fclose($file);

        $user->update(['avatar'=> $fileName]);

      }
    }
}
