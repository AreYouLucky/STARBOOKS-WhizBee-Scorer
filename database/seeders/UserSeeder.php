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
                'name' => 'Shariffalyn Jannah Dimaudtang Latip',
                'school' => 'Malalag National High School',
                'address' => 'Sarangani, Maitum',
            ],
            [
                'name' => 'JOHN MART E. MABASA',
                'school' => 'Alabel National Science High School',
                'address' => 'Sarangani, Alabel (Capital)',
            ],
            [
                'name' => 'Cassandra Sheree B. Mooney',
                'school' => 'Malapatan National High School',
                'address' => 'Sarangani, Malapatan',
            ],
            [
                'name' => 'GIO ANTONIO M. NUNEZ',
                'school' => 'GENERAL SANTOS CITY NATIONAL HIGH SCHOOL',
                'address' => 'South Cotabato, City of General Santos',
            ],
            [
                'name' => 'Kate Nicole Q. Caminse',
                'school' => 'Fatima National High School',
                'address' => 'South Cotabato, City of General Santos',
            ],
            [
                'name' => 'Princess Cherry Ann M. Gutierrez',
                'school' => 'Banisil National High Shool',
                'address' => 'South Cotabato, City of General Santos',
            ],
            [
                'name' => 'James David Balbino',
                'school' => 'Alabel National High School',
                'address' => 'Sarangani, Alabel (Capital)',
            ],
            [
                'name' => 'Nymbee F. Enero',
                'school' => 'Labangal National High School',
                'address' => 'South Cotabato, City of General Santos',
            ],
            [
                'name' => 'Apolla Marie V. Ruto',
                'school' => 'Malungon National High School',
                'address' => 'Sarangani, Malungon',
            ],
            [
                'name' => 'Blezzy Marie L. Ado',
                'school' => 'Malandag National High School',
                'address' => 'Sarangani, Malungon',
            ],
            [
                'name' => 'Jacob Andrei D. Alfanta',
                'school' => 'Colon National High School',
                'address' => 'Sarangani, Maasim',
            ],
            [
                'name' => 'Ardel A. Aloy',
                'school' => 'Malalag National High School',
                'address' => 'Sarangani, Maitum',
            ],
            [
                'name' => 'ZAFIRAH ZHEN C. SAYAO',
                'school' => 'ALABEL NATIONAL SCIENCE HIGH SCHOOL',
                'address' => 'Sarangani, Alabel (Capital)',
            ],
            [
                'name' => 'Edsan A. Bayron',
                'school' => 'Malapatan National High School',
                'address' => 'Sarangani, Malapatan',
            ],
            [
                'name' => 'PHILIP JOSHUA FRANCISCO GUANZON',
                'school' => 'General Santos City National High School',
                'address' => 'South Cotabato, City of General Santos',
            ],
            [
                'name' => 'Shawn Eusehf L. Leonor',
                'school' => 'Fatima National High School',
                'address' => 'South Cotabato, City of General Santos',
            ],
            [
                'name' => 'ERIK V. DALIMBANG',
                'school' => 'GLAN SCHOOL OF ARTS AND TRADES',
                'address' => 'Sarangani, Glan',
            ],
            [
                'name' => 'Lezdy Keziah D. Lincay',
                'school' => 'James L. Chiongbian National Trade School',
                'address' => 'Sarangani, Kiamba',
            ],
            [
                'name' => 'Generoso R. Gaspar',
                'school' => 'Lanton High School',
                'address' => 'South Cotabato, City of General Santos',
            ],
            [
                'name' => 'Ma. Cylene C. Tejano',
                'school' => 'Banisil National High School',
                'address' => 'South Cotabato, City of General Santos',
            ],
            [
                'name' => 'JOHN MIGUEL L. DAYON',
                'school' => 'Alabel National High School',
                'address' => 'Sarangani, Alabel (Capital)',
            ],
            [
                'name' => 'Joaquinito M. Ellaga Jr.',
                'school' => 'Labangal National High School',
                'address' => 'South Cotabato, City of General Santos',
            ],
            [
                'name' => 'JM C Laulita',
                'school' => 'Malalag National High School',
                'address' => 'Sarangani, Maitum',
            ],
            [
                'name' => 'ATHENA U. UY',
                'school' => 'ALABEL NATIONAL SCIENCE HIGH SCHOOL',
                'address' => 'Sarangani, Alabel (Capital)',
            ],
            [
                'name' => 'Meragrace A. Ouano',
                'school' => 'Malapatan National High School',
                'address' => 'Sarangani, Malapatan',
            ],
            [
                'name' => 'ADREA YANKEE L. PADERNILLA',
                'school' => 'Malungon National High School',
                'address' => 'Sarangani, Malungon',
            ],
            [
                'name' => 'Ian Clive F. Magallanes',
                'school' => 'General Santos City National High School',
                'address' => 'South Cotabato, City of General Santos',
            ],
            [
                'name' => 'Aubrey May N. Galenzoga',
                'school' => 'Fatima National High School',
                'address' => 'South Cotabato, City of General Santos',
            ],
            [
                'name' => 'Reyna Nikole V. Tero',
                'school' => 'New Society National High School',
                'address' => 'South Cotabato, City of General Santos',
            ],
            [
                'name' => 'Queen Yurettz M. Cayman',
                'school' => 'Irineo L. Santiago National High School of Metro Dadiangas',
                'address' => 'South Cotabato, City of General Santos',
            ],
            [
                'name' => 'Norlyka C. Libasa',
                'school' => 'Lun Padidu National High School',
                'address' => 'Sarangani, Malapatan',
            ],
            [
                'name' => 'Kenneth Clyde Fellone',
                'school' => 'New Brighton School of the Philippines, Inc.',
                'address' => 'South Cotabato, City of General Santos',
            ],
            [
                'name' => 'Precious Erlene Reazonda Tarinay',
                'school' => 'Kiamba National High School',
                'address' => 'Sarangani, Kiamba',
            ],
            [
                'name' => 'Christine Joyce A. Richa',
                'school' => 'Malalag National High School',
                'address' => 'Sarangani, Maitum',
            ],
            [
                'name' => 'KURT LAAWRENCE V. CIUDAD',
                'school' => 'ALABEL NATIONAL SCIENCE HIGH SCHOOL',
                'address' => 'Sarangani, Alabel (Capital)',
            ],
            [
                'name' => 'Jackie Frenz B. Fernandez',
                'school' => 'Malapatan National High School',
                'address' => 'Sarangani, Malapatan',
            ],
            [
                'name' => 'Keith Julian T. Velasco',
                'school' => 'Malandag National Highschool',
                'address' => 'Sarangani, Malungon',
            ],
            [
                'name' => 'Caryl P. Sambilad',
                'school' => 'Colon National High School',
                'address' => 'Sarangani, Maasim',
            ],
            [
                'name' => 'JELLIAN GRACE A. JUCUTAN',
                'school' => 'GLAN SCHOOL OF ARTS AND TRADES',
                'address' => 'Sarangani, Glan',
            ],
            [
                'name' => 'Aurea Regina P. Sanico',
                'school' => 'James L. Chiongbian National Trade School',
                'address' => 'Sarangani, Kiamba',
            ],
            [
                'name' => 'Sheryl Dayne L. delos Reyes',
                'school' => 'Lanton High School',
                'address' => 'South Cotabato, City of General Santos',
            ],
            [
                'name' => 'Faisal Binu C. Unni',
                'school' => 'Banisil National High School',
                'address' => 'South Cotabato, City of General Santos',
            ],
            [
                'name' => 'Teodoro M. Sucal Jr.',
                'school' => 'Alabel National High School',
                'address' => 'Sarangani, Alabel (Capital)',
            ],
            [
                'name' => 'Norjme Namil',
                'school' => 'Labangal National Hiigh School',
                'address' => 'South Cotabato, City of General Santos',
            ],
            [
                'name' => 'Princez Barbie R. Heolin',
                'school' => 'Malungon National High School',
                'address' => 'Sarangani, Malungon',
            ],
            [
                'name' => 'Rogein Cedric T. Gonzales',
                'school' => 'General Santos City National High School',
                'address' => 'South Cotabato, City of General Santos',
            ],
            [
                'name' => 'JEA T. TERADO',
                'school' => 'FATIMA NATIONAL HIGH SCHOOL',
                'address' => 'South Cotabato, City of General Santos',
            ],
            [
                'name' => 'Reann Rosett M. Valdez',
                'school' => 'Malalag National High School',
                'address' => 'Sarangani, Maitum',
            ],
            [
                'name' => 'Romeo T. Roto Jr',
                'school' => 'Alabel National Science High School',
                'address' => 'Sarangani, Alabel (Capital)',
            ],
            [
                'name' => 'Abdel Raffi H. Musa',
                'school' => 'Malapatan National High School',
                'address' => 'Sarangani, Malapatan',
            ],
        ];

        Student::insertOrIgnore($users);
    }
}
