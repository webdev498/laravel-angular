<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        if( app()->environment() !== 'production' )
        {
          $this->call(UsersTableSeeder::class);
          $this->call(PrioritiesTableSeeder::class);
          $this->call(TasksTableSeeder::class);
          $this->call(TagsTableSeeder::class);
          $this->call(TaskPrioritiesTableSeeder::class);
          $this->call(TaskTagsTableSeeder::class);

          Model::reguard();
        }
    }
}
