<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function authenticate(Request $request)
    {
        // $user = User::where('email', $request->email)->first();

        // if (Hash::check($request->password, $user->password)) {
        //     return response()->json([
        //         'token' => $user->createToken(time())->plainTextToken
        //     ]);
        // }

        // $credentials = $request->only('email', 'password');
        $credentials = $request->validate([
            'email' => ['required', 'email', 'string'],
            'password' => ['required', 'string'],
        ]);

        if (Auth::attempt($credentials)) {
            // Authentication passed...
            $request->session()->regenerate();
            return response()->json([
                'message' => 'Authentication successful',
                'user' => $request->user()
            ], 200);
        }

        // return back()->withErrors([
        //     'email' => __('auth.failed'),
        // ])->onlyInput('email');

        return response()->json(['message' => 'Authentication failed'], 401);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logout successful'], 200);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['message' => 'Registration successful'], 200);
    }
}
