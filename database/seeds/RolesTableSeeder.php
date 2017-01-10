<?php

use Illuminate\Database\Seeder;

// composer require laracasts/testdummy
use Laracasts\TestDummy\Factory as TestDummy;
use App\Role;

class RolesTableSeeder extends Seeder
{
    public function run()
    {
      //all of the above
      Role::create(array('name' => 'Admin'));
      //Editor+Uploader = Page Admin
      Role::create(array('name' => 'Moderator'));
      //can edit, delete -> files/uploads
      Role::create(array('name' => 'Editor'));
      Role::create(array('name' => 'Uploader'));
    }
}
