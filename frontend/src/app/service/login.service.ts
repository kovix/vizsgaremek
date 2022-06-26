import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthResponse, ILogoutResponse, INewAuthToken } from '../model/auth-response';
import { User } from '../model/user';
import { AuthServiceService } from './auth-service.service';
import { TokenTypes } from '../model/token-types';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const refreshTimeout = 3 * 60 * 1000;


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private authService: AuthServiceService
  ) {
    this.refreshTokenLoop();
  }


  public login(userName: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.backend}auth/login`, {
      userName: userName,
      password: password
    }, httpOptions);
  }

  public getCurrentUserData(): Observable<User> {
    return this.http.get<User>(`${environment.backend}user/0`, httpOptions);
  }

  public refreshToken(refreshToken: string): Observable<INewAuthToken> {
    return this.http.post<INewAuthToken>(`${environment.backend}auth/refresh`, { refreshToken });
  }

  public logout(): Observable<ILogoutResponse> {
    return this.http.post<ILogoutResponse>(`${environment.backend}auth/logout`, {});
  }

  private refreshTokenLoop() {
    setInterval(() => {
      const storedToken = this.authService.getToken(TokenTypes.REMEMBERTOKEN);
      if (!storedToken) return;
      this.refreshToken(storedToken).pipe(take(1)).subscribe({
        next: (result) => {
          if (result && result.response) {
            this.authService.saveNewAuthToken(result.response);
          }
        },
        error: (error) => {
          if(error.status === 401 || error.status === 403) {
            this.authService.logOut();
          }
        }
      });
    }, refreshTimeout);
  }

}
