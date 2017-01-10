@extends('tasks.template')

@section('content')

<div class="container-fluid">
	<div class="row">
		<div class="col-md-8">
        <h2 class="">Edit Task</h2>

{!! Form::model($task=new \App\Task, ['route' => ['tasks.store'], 'method' => 'POST', 'class' => 'form-horizontal']) !!}

{!! Form::label('title', 'Title:', ['class' => 'control-label']) !!}
{!! Form::text('title', null, ['class' => 'form-control', 'placeholder' => 'Title', 'required', 'autofocus']) !!}

{!! Form::label('notes', 'Notes:', ['class' => 'control-label']) !!}
{!! Form::textarea('notes', null, ['class' => 'form-control', 'placeholder' => 'Notes', 'required', 'autofocus']) !!}

</br>
</br>
{!! Form::submit('Submit', ['class' => 'btn btn-default']) !!}

    </div>
  </div>
</div>

{!! Form::close() !!}
@stop
