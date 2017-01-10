<?php

use Illuminate\Database\Seeder;
use App\Tag;

// Composer: "fzaninotto/faker"
use Faker\Factory as Faker;

class TaskTagsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $faker = Faker::create();
      foreach(range(1, 40) as $index)
      {
      DB::table('tag_task')->insert(
            [
                'task_id'  => rand(1,20),
                'tag_id' => rand(1,4),
            ]);
      }
    }
}
