<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\LoanApp;

class LoanAppTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();
 
        // Create 50 fake loan app records
        for ($i = 0; $i < 50; $i++) {
            LoanApp::create([
                'first_name' => $faker->name,
                'last_name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'phone' => $faker->phoneNumber,
                'ssn' => $faker->randomNumber(9),
                'credit_score' => $faker->randomNumber(3)
            ]);
        }
    }
}
