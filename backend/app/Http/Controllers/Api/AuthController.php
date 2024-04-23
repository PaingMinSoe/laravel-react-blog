<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request) {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|confirmed|min:8',
        ]);

        $user = User::create($data);
        $token = $user->createToken('blog token')->plainTextToken;

        return response(compact('user', 'token'));
    }

    public function login(Request $request) {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('blog token')->plainTextToken;

            return response(compact('user', 'token'));
        }

        return response([
            'message' => 'Incorrect Email or Password',
        ], 422);
    }

    public function logout() {
        Auth::user()->currentAccessToken()->delete();

        return response([
            'message' => 'Successfully logged out'
        ]);
    }


}
