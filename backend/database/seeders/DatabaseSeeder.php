<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Blog;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        Category::factory(5)->create();

        $user = User::create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
        ]);

        $blogs = Blog::factory(20)->create([
            'user_id' => $user->id
        ]);

        $blogs->each(function ($blog) {
            $categories = Category::inRandomOrder()->take(rand(1,3))->get();
            $blog->categories()->attach($categories->pluck('id'));
        });

    }
}
