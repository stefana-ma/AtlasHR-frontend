export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    username: string;
    role: string;
}

export interface RegisterRequest {
    fullName: string;
    username: string;
    email: string;
    password: string;
    role: string;
}

export interface RegisterResponse {
    username: string;
    role: string;
    token: string;
}