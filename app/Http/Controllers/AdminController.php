<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Services\ZuviaTokenService;

class AdminController extends Controller
{
    public function __construct(
        private ZuviaTokenService $zuviaService   
    )
    {}

    public function index(Request $request): Response
    {
       $filters = $request->only(['name', 'status', 'startDate', 'endDate', 'page', 'limit']);

        $response = $this->zuviaService->getAdmins($filters);
        if(!$response->success) return redirect()->back()->with([
            'color' => 'red',
            'message' => $response->message_error
        ]);

        $data = $response->data?->users; 
        return Inertia::render('Admin/Index', [ 'data' => $data ] );
    }
}
