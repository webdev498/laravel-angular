<?php

use Illuminate\Database\Seeder;
use App\Task;

// Composer: "fzaninotto/faker"
use Faker\Factory as Faker;

class TasksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        foreach(range(1, 20) as $index)
        {
          Task::create([
          'user_id' => rand(1,4),
          'title' => implode($faker->sentences(2)),
          'priority_id' => rand(1,4),
          'notes' => implode($faker->paragraphs(4)),
          ]);
        }
    }
}
