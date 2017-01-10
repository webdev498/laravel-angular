<?php

use Illuminate\Database\Seeder;
use App\Priority;

// Composer: "fzaninotto/faker"
use Faker\Factory as Faker;
class PrioritiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $faker = Faker::create();
      Priority::create(['name' => 'Low']);
      Priority::create(['name' => 'Medium Low']);
      Priority::create(['name' => 'Medium']);
      Priority::create(['name' => 'Medium High']);
      Priority::create(['name' => 'High']);
    }
}
