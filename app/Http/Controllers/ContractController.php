<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContractController extends Controller
{
    public function index(Request $request): Response
    {
        $accounts = [];
        return Inertia::render('Contract/Index', [ $accounts ] );
    }
}
