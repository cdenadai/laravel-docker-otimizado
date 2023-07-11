<?php

namespace App\Services;

use App\Entities\LoginBody;
use Exception;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Facades\Http;

class ZuviaTokenService
{
    private PendingRequest $client;
    private string $baseUrl;
    private string $healthUrl = 'api/health';
    private string $loginUrl = 'admins/login';
    private string $getAdminsUrl = 'admins';

    public function __construct()
    {
        $this->setBaseUrl();
        $this->setClient();
    }

    public function setBaseUrl(): void {
        $baseUrl = env('ZUVIA_TOKEN_API_URL', null);
        if(!$baseUrl) throw new Exception('Api url not found');
        $this->baseUrl = $baseUrl;
    }

    public function setClient(): void {
        $this->client = Http::withOptions([
            'base_uri' => $this->baseUrl
        ]);
    }

    public function getLoggedClient() : PendingRequest {
        $token = session('token');
        if(!$token) throw new Exception('Authentication Token not found');
        
        return $this->client->withToken($token);
    }
    
    public function health(): bool {
        $response = $this->client->get($this->healthUrl);
        return $response->successful();
    }

    public function login(LoginBody $data) {
        $response = $this->client->post($this->loginUrl, $data);
        return $response->object();
    }

    public function getAdmins(array $filters) {
        $client = $this->getLoggedClient();
        $response = $client->get($this->getAdminsUrl);
        return $response->object();
    }
}
