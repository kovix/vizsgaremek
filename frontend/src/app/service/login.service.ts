import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthResponse } from '../model/auth-response';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  public login(userName: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.backend}user/login`, {
      userName: userName,
      password: password
    }, httpOptions);
  }
}
