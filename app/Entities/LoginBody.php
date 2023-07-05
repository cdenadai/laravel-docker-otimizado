<?php

namespace App\Entities;

class LoginBody
{
    public function __construct(
        public string $email,
        public string $password
    )
    {}
}
