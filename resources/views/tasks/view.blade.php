@extends('tasks.template')

@section('content')

<h2 class="form-signin-heading">View a Task</h2>

@if (isset($task))
<table class="table table-striped">
	<tr>
		<td> Title</td>
		<td>{!! $task->title !!}</td>
	</tr>
	<tr>
		<td> Priority</td>
		<td>{!! $task->priority_id !!}</td>
	</tr>
	<tr>
		<td> Notes</td>
		<td>{!! $task->notes !!}</td>
	</tr>
</table>
@endif

@stop
