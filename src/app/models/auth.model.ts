export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserData {
  id: number;
  email: string;
  name: string;
  lastname: string;
}

export interface LoginResponse extends UserData {
  token: string;
  roles: string[];
}

export interface RegisterRequest {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  id: number;
  email: string;
  name: string;
  lastname: string;
  token: string;
  roles: string[];
}
