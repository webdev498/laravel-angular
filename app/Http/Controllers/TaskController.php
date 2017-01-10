<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use JWTAuth;
use Auth;
use App\Task;
use App\Tag;
use Log;
use Gate;
use App\User;
use App\Priority;
use App\Http\Requests;
use App\Http\Requests\TaskRequest;
use App\Http\Controllers\Controller;

class TaskController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
      $token = JWTAuth::getToken();
      $user = JWTAuth::toUser($token);

      $data['user']=Auth::User();
      $data['tasks']=Task::with('priority','tags')->own()->get();
      $data['priorities']=Priority::all();
      $data['tags']=Tag::all();
      return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        return view('tasks.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(TaskRequest $request)
    {
        Log::info("[App\TaskController]: Save a Task");
        $this->createTask($request);
        return response()->json(array('success' => true));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show(Task $task, TaskRequest $request) {
        Log::info("[App\TaskController]: Get a Task");
        $task=Task::with('priority','tags')->where('id',$task->id)->first();
        return response()->json($task);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Task $task, TaskRequest $request)
    {
        Log::info("[App\TaskController]: Update a Task");
        if(!Gate::allows('update', $task)){
          return response()->json(['error' => 'forbiden_user'], 501);
        }
        $task->update($request->only(['title','notes', 'priority_id']));

        //Client may send response as true/false
        $status=$request->only('status');
        Log::info($status);
        if($status){
        //   if($status==true || $status=='True' || $status==1){
        //     $task->update(['status'=>1]);
        //   }
        // }else{
          $task->update(['status'=>$status['status']]);
        }

        //Task to be updated
        Log::info($task);

        //Protect against empty taglist syncing
        if($request->input('tag_list')){
          $this->syncTags($task, $request->input('tag_list'));
        }

        return response()->json(array('success' => true));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy(Task $task, TaskRequest $request)
    {
        Log::info("[App\TaskController]: Delete a Task");
        $task->delete();
        return response()->json(array('success' => true));
    }

    /**
     * sync tags to Task
     * @param  Task   $task Object
     * @return void
     */
    private function syncTags(Task $task, array $tags) {
      if(is_array($tags)){
        $task->tags()->sync($tags);
      }
    }

    /**
     * create a Task
     * @param  TaskRequest $request
     * @return task               created task Object
     */
    private function createTask(TaskRequest $request) {
      $task=Auth::user()->tasks()->create($request->all());
      if($request->input('tag_list')){
        $this->syncTags($task, $request->input('tag_list'));
      }

      return $task;
    }
}
