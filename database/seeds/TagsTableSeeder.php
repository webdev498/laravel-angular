<?php

use Illuminate\Database\Seeder;
use App\Tag;

// Composer: "fzaninotto/faker"
use Faker\Factory as Faker;

class TagsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $faker = Faker::create();
      $tags = ['home', 'school', 'work', 'friends'];
      foreach($tags as $tag)
      {
        Tag::create([
          'name' => $tag
        ]);
      }
    }
}
