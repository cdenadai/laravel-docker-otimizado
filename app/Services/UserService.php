<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserService
{
    public function __construct(private User $model)
    {
    }

    public function findOrCreate(object $data) {
        $user = $this->model
            ->where('email', $data->email)
            ->first();

        if(!$user) $user = $this->model->create((array) $data);
        return $user;
    }

    public function authenticate(object $data) {
        $user = $this->findOrCreate($data);
        
        Auth::loginUsingId($user->id);
    }
}
