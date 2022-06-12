import { User } from "./user";

export class AuthResponse {
  accessToken: string = '';
  refreshToken: string = '';
  user: User = new User();
}
