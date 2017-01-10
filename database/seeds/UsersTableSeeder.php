<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\User;
// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class UsersTableSeeder extends Seeder {

	public function run()
	{
		DB::table('users')->truncate();
		$faker = Faker::create();

		foreach(range(2, 4) as $index)
		{
			User::create([
				'name' => $faker->name(),
				'email' => $faker->email(),
				'password' => env('SEED_SECRET', 'test_password'),
			]);
		}
		User::create([
				'name' => 'Kenneth Massada',
				'email' => 'admin@laravel5-ng.dev',
				'password' => env('SEED_SECRET', 'test_password'),
			]);
	}

}
