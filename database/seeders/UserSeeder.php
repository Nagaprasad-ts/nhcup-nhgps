<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Ensure roles exist before assigning
        $superAdmin = Role::firstOrCreate(['name' => 'super_admin', 'guard_name' => 'web']);
        $coreTeam = Role::firstOrCreate(['name' => 'core-team',   'guard_name' => 'web']);

        // Super Admin
        $admin = User::firstOrCreate(
            ['email' => 'admin@nhgps.com'],
            [
                'name' => 'Super Admin',
                'password' => bcrypt('password'),
            ]
        );
        $admin->assignRole($superAdmin);

        // Core Team
        $team = User::firstOrCreate(
            ['email' => 'team@nhgps.com'],
            [
                'name' => 'Core Team',
                'password' => bcrypt('password'),
            ]
        );
        $team->assignRole($coreTeam);
    }
}
