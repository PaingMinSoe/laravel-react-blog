<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{
    public function register(Request $request) {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|confirmed|min:8',
            'password_confirmation' => 'required',
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

        return response()->json([
            'errors' => [
                'email' => [
                    'incorrect Email or Password'
                ]
            ]
        ], 422);
    }

    public function logout() {
        Auth::user()->currentAccessToken()->delete();

        return response([
            'message' => 'Successfully logged out'
        ]);
    }

    public function updateProfile(Request $request) {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'profile_image' => 'image',
        ]);

        if ($request->has('profile_image')) {
            $filename = Carbon::now()->format('Y-m-d_H:i:s') . "_" . $request->file('profile_image')->getClientOriginalName();
            $request->file('profile_image')->move('profile_images/', $filename);

            Auth::user()->update([
                'name' => $data['name'],
                'email' => $data['email'],
                'profile_image' => $filename,
            ]);
        } else {
            Auth::user()->update($data);
        }
    }


}
