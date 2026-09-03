<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Student;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Angel Maeh Lecera Belonio',
                'school' => 'Gov. Nonito D. Llanos Sr. National High School',
                'address' => 'Davao del Sur, Kiblawan',
            ],
            [
                'name' => 'Justin Dave D. Balsicas',
                'school' => 'Kapatagan National High School',
                'address' => 'Davao del Sur, City of Digos (Capital)',
            ],
            [
                'name' => 'Jenny S. Camansi',
                'school' => 'Soong National High School',
                'address' => 'Davao del Sur, City of Digos (Capital)',
            ],
            [
                'name' => 'Kryzford S. Pergura',
                'school' => 'Holy Cross of Magsaysay Inc.',
                'address' => 'Davao del Sur, Magsaysay',
            ],
            [
                'name' => 'JEKHA SHAYNE VILLAMOR',
                'school' => 'Gov. Nonito D. Llanos Sr. National High School',
                'address' => 'Davao del Sur, Kiblawan',
            ],
            [
                'name' => 'Oizen William C. Bughao',
                'school' => 'Digos City National High School',
                'address' => 'Davao del Sur, City of Digos (Capital)',
            ],
            [
                'name' => 'Kenneth Jaylord M. Timcang',
                'school' => 'Magsaysay Academy Incorporated',
                'address' => 'Davao del Sur, Magsaysay',
            ],
            [
                'name' => 'Christian Alexan E. Sy',
                'school' => 'Digos City National High School',
                'address' => 'Davao del Sur, City of Digos (Capital)',
            ],
            [
                'name' => 'Annejel Zyrene N. Alberca',
                'school' => 'Digos City Senior High School',
                'address' => 'Davao del Sur, City of Digos (Capital)',
            ],
            [
                'name' => 'Braille Joy s. Formentera',
                'school' => 'Soong National High School',
                'address' => 'Davao del Sur, City of Digos (Capital)',
            ],
            [
                'name' => 'ANELOU A. CABARDO',
                'school' => 'SULOP NATIONAL HIGH SCHOOL',
                'address' => 'Davao del Sur, Sulop',
            ],
            [
                'name' => 'Patrick Pahit',
                'school' => 'bangkal national high school',
                'address' => 'Davao del Sur, Matanao',
            ],
            [
                'name' => 'Axle Greg C. Salcedo',
                'school' => 'Polytechnic College of Davao Del Sur',
                'address' => 'Davao del Sur, City of Digos (Capital)',
            ],
            [
                'name' => 'Ariane T. Legita',
                'school' => 'Digos City National High School',
                'address' => 'Davao del Sur, City of Digos (Capital)',
            ],
            [
                'name' => 'Gabriel Angelo R. Calinawan',
                'school' => 'Holy Cross of Malalag, Inc.',
                'address' => 'Davao del Sur, Malalag',
            ],
            [
                'name' => 'Baby Queen Basay Lecera',
                'school' => 'Gov. Nonito D. Llanos Sr. National High School',
                'address' => 'Davao del Sur, Kiblawan',
            ],
            [
                'name' => 'Grant Haven D. Geolina',
                'school' => 'Digos City Senior High School',
                'address' => 'Davao del Sur, City of Digos (Capital)',
            ],
            [
                'name' => 'Gendy Lorraine P. Coscos',
                'school' => 'Barayong National High School',
                'address' => 'Davao del Sur, Magsaysay',
            ],
            [
                'name' => 'Jhon Cyrel L. Lecera',
                'school' => 'Gov. Nonito D. Llanos Sr. National High School',
                'address' => 'Davao del Sur, Kiblawan',
            ],
            [
                'name' => 'Johland Vale',
                'school' => 'Barayong National High School',
                'address' => 'Davao del Sur, Magsaysay',
            ],
            [
                'name' => 'Miguel Devonne A. Samper',
                'school' => 'Digos City National High School',
                'address' => 'Davao del Sur, City of Digos (Capital)',
            ],
            [
                'name' => 'Denylyn Lape',
                'school' => 'Soong National High School',
                'address' => 'Davao del Sur, City of Digos (Capital)',
            ],
            [
                'name' => 'nelyzza v. eliseo',
                'school' => 'Holy Cross Of Magsaysay Inc',
                'address' => 'Davao del Sur, Magsaysay',
            ],
            [
                'name' => 'Joella Joyce D. Moreno',
                'school' => 'Digos City Senior High School',
                'address' => 'Davao del Sur, City of Digos (Capital)',
            ],
            [
                'name' => 'Xander Lance C. Cubelo',
                'school' => 'Digos City National High School',
                'address' => 'Davao del Sur, City of Digos (Capital)',
            ],
        ];
           
        Student::insertOrIgnore($users);
    }
}
