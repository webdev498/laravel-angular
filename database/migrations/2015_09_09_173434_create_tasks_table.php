<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('tasks', function (Blueprint $table) {
        $table->increments('id');
        $table->integer('user_id');
        $table->integer('priority_id')->default(1);
        $table->string('title', 255)->nullable();
        $table->string('notes', 255)->nullable();
        $table->timestamps();
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
      Schema::drop('tasks');
    }
}
