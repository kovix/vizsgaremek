import { User } from "./user";

export interface INewAuthToken {
  response: string;
}

export interface ILogoutResponse {
  success: boolean;
}

export class AuthResponse {
  accessToken: string = '';
  refreshToken: string = '';
  user: User = new User();
}
