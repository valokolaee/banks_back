// src/types/auth.types.ts
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;

}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: any;
}