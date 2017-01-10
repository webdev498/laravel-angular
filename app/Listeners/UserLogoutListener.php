<?php

namespace App\Listeners;

use App\Stat;
use App\User;
use Auth;
use Log;
use Carbon\Carbon;
use App\Events;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Events\UserLogoutEvent;


class UserLogoutListener
{
    /**
     * Create the event handler.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  Events  $event
     * @return void
     */
    public function handle(UserLogoutEvent $event) {
      $user=$event->user;
      if($stat=Stat::lastLoginStat($user)){
        Log::log('logout duration');
        $stat->duration=$stat->created_at->diff(Carbon::now())->format('%hh:%im:%ss');
        $stat->last_login = $stat->created_at;
        $stat->save();
      }
    }
}
