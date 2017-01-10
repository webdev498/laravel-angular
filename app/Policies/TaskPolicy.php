<?php

namespace App\Policies;

use App\User;
use App\Task;

class TaskPolicy
{
    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the given task can be updated by the user.
     *
     * @param  \App\User  $user
     * @param  \App\task  $task
     * @return bool
     */
    public function update(User $user, Task $task)
    {
        return $user->id === $task->user_id;
    }

}
