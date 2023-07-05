<?php

namespace App\Http\Controllers\Auth;

use App\Entities\LoginBody;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use App\Services\UserService;
use App\Services\ZuviaTokenService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    public function __construct(
        private ZuviaTokenService $zuviaService,
        private UserService $userService    
    )
    {
        
    }
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        $apiStatus = $this->zuviaService->health();

        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
            'apiStatus' => $apiStatus
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $loginBody = new LoginBody(...$request->validated());
        $loginResult = $this->zuviaService->login($loginBody);
        
        if(!$loginResult->success) {
            return redirect()->back()->with([
                'color' => 'red',
                'message' => $loginResult->message_error
            ]);
        }

        $this->userService->authenticate($loginResult->data);
        $request->session()->regenerate();
        
        session([ 'token' => $loginResult->data->token ]);

        return redirect()->intended(RouteServiceProvider::HOME);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
