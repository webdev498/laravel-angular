<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;
use App\Task;
use Auth;

class TaskRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
      $taskId = \Route::input('task');

      // verify user logged in
      if(! Auth::user()){
        return false;
      }

      // // verify if task is user's
      // $task = Task::own()->first();
      // if ($task) {
      //   return true;
      // }

      return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
      switch ($this->method()) {
          case 'GET':
          case 'DELETE':
              return [];

          case 'POST':
              return [
                  'title'=> 'required|min:15',
              ];

          case 'PUT':
          case 'PATCH':
              return [
                  'title'=> 'required|min:15',
            ];
      }
    }
}
