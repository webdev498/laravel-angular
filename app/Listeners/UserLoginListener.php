<?php

namespace App\Listeners;


use App\Stat;
use App\User;
use Auth;
use Log;
use Carbon\Carbon;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Events\UserLoginEvent;

class UserLoginListener
{
    /**
     * Create the event handler.
     *
     * @return void
     */
    public function __construct() {
        //
    }

    /**
     * Handle the event.
     *
     * @param  Events  $event
     * @return void
     */
    public function handle(UserLoginEvent $event) {
      $user=$event->user;
      $this->collectStat($user);
    }
    /**
     * Collect stats on user login
     * @return [type] [description]
     */
    private function collectStat($user) {
      //collect stats on users
      Log::info('collecting');
      $stat=new Stat;
      $stat->user_id = $user->email;
      $stat->last_login = Stat::lastLoginDate($user);
      $stat->ip = $_SERVER['REMOTE_ADDR'];
      $stat->browser = $_SERVER['HTTP_USER_AGENT'];
      $stat->save();
    }
}
