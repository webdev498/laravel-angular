@extends('tasks.template')

@section('content')

<h2 class="form-signin-heading">List Tasks</h2>


<div class="table-responsive">
<table class="table table-striped">
	<thead>
		<tr>
			<th>Title</th>
			<th></th>
		</tr>
	</thead>
	<tbody>
		@if(count($tasks))
		@foreach ($tasks as $task)
		<tr>
			<td>
				<a href="{!! route('tasks.show', ['tasks'=> $task->id]) !!}">
					{{ $task->title }}
				</a>
			</td>
			<td><a href="{!! route('tasks.show', ['tasks'=> $task->id]) !!}"
				class="glyphicon glyphicon-sunglasses btn btn-xs"> </a>
			</td>
			<td><a href="{!! route('tasks.edit', ['tasks'=> $task->id]) !!}"
				class="glyphicon glyphicon-pencil btn btn-xs"> </a>
			</td>
		</tr>
		@endforeach
		@endif
		</tbody>
	</table>
</div>
</br>

@stop
