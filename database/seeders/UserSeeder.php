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
        $users = $users = [
            ['name' => 'Qwyncy Eva P. Turtoga', 'school' => 'Sto. Tomas National High School', 'address' => 'Davao del Norte, Santo Tomas'],
            ['name' => 'Luke Rhupert G. Lawas', 'school' => 'University of the Immaculate Conception', 'address' => 'Davao del Sur, City of Davao'],
            ['name' => 'RALPH ALEXANDER S. MAMON', 'school' => 'Compostela National High School', 'address' => 'Davao de Oro, Compostela'],
            ['name' => 'Laisa L. Balintaculo', 'school' => 'Sto. Tomas National High School', 'address' => 'Davao del Norte, Santo Tomas'],
            ['name' => 'Princess Catherine A. Nacito', 'school' => 'Sto. Tomas National High School', 'address' => 'Davao del Norte, Santo Tomas'],
            ['name' => 'Janus V. Robis', 'school' => 'Sto. Tomas National High School', 'address' => 'Davao del Norte, Santo Tomas'],
            ['name' => 'Nelio Jey Barquin', 'school' => 'Compostela National High School', 'address' => 'Davao de Oro, Compostela'],
            ['name' => 'Charise Anya F. Panimdim', 'school' => 'Compostela National High School', 'address' => 'Davao de Oro, Compostela'],
            ['name' => 'Kyle Jayden L Idul', 'school' => 'Davao City National High School', 'address' => 'Davao del Sur, City of Davao'],
            ['name' => 'ERICH MAE M. CADERAO', 'school' => 'Compostela National High School', 'address' => 'Davao de Oro, Compostela'],
            ['name' => 'Klaudette Grace P. Sinsuat', 'school' => 'University of the Immaculate Conception', 'address' => 'Davao del Sur, City of Davao'],
            ['name' => 'Michael ll Juban Dianga', 'school' => 'Matanao National High School', 'address' => 'Davao del Sur, Matanao'],
            ['name' => 'Jeather C. Forro', 'school' => 'Compostela National High School', 'address' => 'Davao de Oro, Compostela'],
            ['name' => 'Ysabelle Keisha Marie R. Paroco', 'school' => 'University of the Immaculate Conception', 'address' => 'Davao del Sur, City of Davao'],
            ['name' => 'Osric Zoe Abellana Paman', 'school' => 'Philippine Science High School - Southern Mindanao Campus', 'address' => 'Davao del Sur, City of Davao'],
            ['name' => 'Sean Bryn Dajao Opiso', 'school' => 'Philippine Science High School - Southern Mindanao Campus', 'address' => 'Davao del Sur, City of Davao'],
            ['name' => 'CYDRIC ANTHONY M. ALJAS', 'school' => 'MONTEVISTA STAND ALONE SENIOR HIGH SCHOOL', 'address' => 'Davao de Oro, Montevista'],
            ['name' => 'Franziska Zoe G. Cabal', 'school' => 'Panabo City National High School', 'address' => 'Davao del Norte, City of Panabo'],
            ['name' => 'Sheila Marie Soliva', 'school' => 'Calinan National High School', 'address' => 'Davao del Sur, City of Davao'],
            ['name' => 'Nathalie Joy G.Digal', 'school' => 'San Vicente National High School', 'address' => 'Davao del Norte, City of Panabo'],
            ['name' => 'Roiana Gayle Lambojo Dolar', 'school' => 'Little Panay National High School', 'address' => 'Davao del Norte, City of Panabo'],
            ['name' => 'Princess Caren Gilley B. Abellana', 'school' => 'Calinan National High School', 'address' => 'Davao del Sur, City of Davao'],
            ['name' => 'Venice Mae A. Poloyapoy', 'school' => 'Little Panay NHS', 'address' => 'Davao del Norte, City of Panabo'],
            ['name' => 'Bien Margaret B. Jamisola', 'school' => 'Brokenshire College, Inc.', 'address' => 'Davao del Sur, City of Davao'],
            ['name' => 'Ivan Glenny L. Pido', 'school' => 'Brokenshire College Inc.', 'address' => 'Davao del Sur, City of Davao'],
            ['name' => 'Alexis Daniel A. Castre', 'school' => 'Pantukan National High School', 'address' => 'Davao de Oro, Pantukan'],
            ['name' => 'King Dione R. Flores', 'school' => 'Sto. Tomas National High School', 'address' => 'Davao del Norte, Santo Tomas'],
            ['name' => 'Angel Lyka B. Ayoc', 'school' => 'Digos City National High School', 'address' => 'Davao del Sur, City of Digos (Capital)'],
            ['name' => 'Eric Luis C. Ongoy', 'school' => 'CRISPIN E. ROJAS NATIONAL HIGH SCHOOL', 'address' => 'Davao Oriental, Baganga'],
            ['name' => 'Aldriane Kent C. Bancoro', 'school' => 'Asuncion National High School', 'address' => 'Davao del Norte, Asuncion'],
            ['name' => 'Russel P. Tantoy', 'school' => 'Montevista Stand Alone Senior High School', 'address' => 'Davao de Oro, Montevista'],
            ['name' => 'Erby Nichole G. Taripe', 'school' => 'Brokenshire College Inc.', 'address' => 'Davao del Sur, City of Davao'],
            ['name' => 'Uequichad Allian A. Lorilla', 'school' => 'Kapalong National High School', 'address' => 'Davao del Norte, Kapalong'],
            ['name' => 'Juan Rafael L. Quilantang', 'school' => 'Assumption College of Nabunturan', 'address' => 'Davao de Oro, Nabunturan (Capital)'],
            ['name' => 'Andre D. Tio', 'school' => 'San Isidro National High School', 'address' => 'Davao Oriental, San Isidro'],
            ['name' => 'Gledza Mae Oclarit', 'school' => 'Southern Davao NHS', 'address' => 'Davao del Norte, City of Panabo'],
            ['name' => 'Ronalyn Mae C. Genson', 'school' => 'Southern Davao National High School', 'address' => 'Davao del Norte, City of Panabo'],
            ['name' => 'HONNY JOY L. NEPANGUE', 'school' => 'MONTEVISTA STAND ALONE SENIOR HIGH SCHOOL', 'address' => 'Davao de Oro, Montevista'],
            ['name' => 'Johland C. Vale', 'school' => 'Barayong NHS', 'address' => 'Davao del Sur, Magsaysay'],
            ['name' => 'Attelah Dwyne O. Ceriaco', 'school' => 'Calinan National High School', 'address' => 'Davao del Sur, City of Davao'],
            ['name' => 'Kwyncy Cyrstynne J. Hildawa', 'school' => 'Tagum City National High School', 'address' => 'Davao del Norte, City of Tagum (Capital)'],
            ['name' => 'Doniko D. Maglana', 'school' => 'University of the Immaculate Conception', 'address' => 'Davao del Sur, City of Davao'],
            ['name' => 'Kelvin Maktom B. Raymundo', 'school' => 'CRISPIN E. ROJAS NATIONAL HIGH SCHOOL', 'address' => 'Davao Oriental, Baganga'],
            ['name' => 'Tabac, Kessel Lyvynyl V.', 'school' => 'Calinan National Highschool', 'address' => 'Davao del Sur, City of Davao'],
            ['name' => 'Sheena Andrea A. Tilao', 'school' => 'Brokenshire College Inc.', 'address' => 'Davao del Sur, City of Davao'],
            ['name' => 'Raine Gabrielle Nocete', 'school' => 'Tagum City National High School', 'address' => 'Davao del Norte, City of Tagum (Capital)'],
            ['name' => 'AMENAH M AROZA', 'school' => 'CALAPAGAN NATIONAL HIGH SCHOOL', 'address' => 'Davao Oriental, Lupon'],
            ['name' => 'Jan Charmel P. Tayo', 'school' => 'BARAYONG NHS', 'address' => 'Davao del Sur, Magsaysay'],
            ['name' => 'Khyrzstine Faith Saromines', 'school' => 'Mariano Peralta National High School', 'address' => 'Davao Occidental, Malita (Capital)'],
            ['name' => 'JIEAH JIEL C. CALAÑAS', 'school' => 'Montevista Stand Alone Senior High School', 'address' => 'Davao de Oro, Montevista'],
        ];
           
        Student::insertOrIgnore($users);
    }
}
