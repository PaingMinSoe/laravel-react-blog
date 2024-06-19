<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return new UserResource($request->user());
});


Route::get('blogs', [BlogController::class, 'index']);
Route::post('blogs', [BlogController::class, 'store'])->middleware('auth:sanctum');
Route::get('blogs/{blog}', [BlogController::class, 'show']);

Route::get('categories', [CategoryController::class, 'index']);
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('/user/update', [AuthController::class, 'updateProfile'])->middleware('auth:sanctum');

Route::post('/comments/create', [CommentController::class, 'store'])->middleware('auth:sanctum');
