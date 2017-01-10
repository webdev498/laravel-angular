<?php

use Illuminate\Database\Seeder;
use App\Task;

// Composer: "fzaninotto/faker"
use Faker\Factory as Faker;

class TaskPrioritiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      Task::all()->map(function($item){
          $item->priority_id=rand(1,4);
        });
    }
}
