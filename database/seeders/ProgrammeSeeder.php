<?php

namespace Database\Seeders;

use App\Models\Programme;
use Illuminate\Database\Seeder;

class ProgrammeSeeder extends Seeder
{
    public function run(): void
    {
        Programme::truncate();

        Programme::create([
            'key' => 'A',
            'emoji' => '🧠',
            'name' => 'Brain Builders Programme',
            'subtitle' => 'Strengthening thinking, logic, and problem-solving',
            'short_desc' => 'Thinking, Logic & Problem-Solving',
            'full_desc' => 'A carefully designed programme that builds strong cognitive foundations through numbers, patterns, and logical thinking. Children engage in hands-on activities that naturally improve focus, memory, and analytical ability — without pressure.',
            'days' => 'Mon & Thu',
            'schedule' => 'Mon: Chess, Puzzles, Coding, Lego · Thu: Abacus',
            'experience' => [
                'Develop number sense and mental maths',
                'Build logical thinking and pattern recognition',
                'Learn problem-solving strategies',
                'Explore early coding concepts',
                'Engage in creative building and construction',
            ],
            'activities' => [
                'Abacus', 'Puzzle Lab', 'Memory Games', 'Pattern Recognition',
                'Chess Foundations', 'Cognitive Exercises', 'Basic Coding', 'Lego Robotics',
            ],
            'outcome_text' => 'Children develop sharper thinking, better concentration, and the confidence to approach problems independently.',
            'about_outcomes' => [
                'Sharper thinking & concentration',
                'Better memory & logical reasoning',
                'Problem-solving ability',
                'Creativity & innovation',
            ],
            'sort_order' => 1,
        ]);

        Programme::create([
            'key' => 'B',
            'emoji' => '🎨',
            'name' => 'Confidence & Expression Programme',
            'subtitle' => 'Building confident, expressive, and creative individuals',
            'short_desc' => 'Express, Communicate & Perform',
            'full_desc' => 'A vibrant, nurturing programme that encourages children to express themselves freely through movement, music, storytelling, and art. It helps children feel comfortable being themselves — while building confidence in communication and social interaction.',
            'days' => 'Tue & Fri',
            'schedule' => 'Tue: Dance · Fri: Music, Speaking, Story, Art',
            'experience' => [
                'Improve verbal and non-verbal communication',
                'Explore creativity and self-expression',
                'Gain confidence in speaking and performing',
                'Express emotions through art and movement',
            ],
            'activities' => [
                'Dance & Free Style', 'Music & Rhythm', 'Story Enactment',
                'Public Speaking', 'Art & Craft',
            ],
            'outcome_text' => 'Children become more confident, expressive, and comfortable in sharing their thoughts and ideas.',
            'about_outcomes' => [
                'Communication confidence',
                'Creativity & imagination',
                'Social interaction skills',
                'Stage confidence & self-expression',
            ],
            'sort_order' => 2,
        ]);

        Programme::create([
            'key' => 'C',
            'emoji' => '⚽',
            'name' => 'Movement & Sports Foundation',
            'subtitle' => 'Developing coordination, fitness, and discipline',
            'short_desc' => 'Coordination, Fitness & Discipline',
            'full_desc' => 'An active and engaging programme focused on physical development, coordination, and overall fitness. Through structured play and movement, children build strength, balance, and discipline — while enjoying every session.',
            'days' => 'Wed, Sat & Sun',
            'schedule' => 'Wed: Sports & Games · Sat & Sun: Karate',
            'experience' => [
                'Develop motor skills and coordination',
                'Improve balance and body control',
                'Learn team participation and discipline',
                'Build agility and physical endurance',
            ],
            'activities' => [
                'Kicking & Dribbling', 'Throwing & Catching', 'Karate',
                'Balance Beams', 'Coordination Drills', 'Obstacle Courses', 'Agility Ladders',
            ],
            'outcome_text' => 'Children build strong physical foundations, better coordination, and healthy active habits for life.',
            'about_outcomes' => [
                'Motor skills & coordination',
                'Balance & agility',
                'Strength & body control',
                'Discipline & active habits',
            ],
            'sort_order' => 3,
        ]);
    }
}
