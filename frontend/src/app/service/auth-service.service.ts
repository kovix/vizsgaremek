import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthResponse } from '../model/auth-response';
import { TokenTypes } from '../model/token-types';

const AUTHTOKENKEY = 'AUTHTOKEN';
const REFRESHTOKENKEY = 'REFRESHTOKEN';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor() { }

  public logOut(): void {
    window.localStorage.clear();
    this.loggedIn.next(false);
  }

  public saveToken(data: AuthResponse): void {
    this.clearTokens();
    if (data.accessToken) {
      window.localStorage.setItem(TokenTypes.AUTHTOKEN, data.accessToken);
      this.loggedIn.next(true);
    }
    if (data.refreshToken) {
      window.localStorage.setItem(TokenTypes.REMEMBERTOKEN, data.refreshToken);
    }
  }

  public clearTokens() {
    window.localStorage.removeItem(TokenTypes.AUTHTOKEN);
    window.localStorage.removeItem(TokenTypes.REMEMBERTOKEN);
    this.loggedIn.next(false);
  }

  public getToken(tokenType: string): string|null {
    if ((<any>Object).values(TokenTypes).includes(tokenType)) {
      return window.localStorage.getItem(tokenType);
    } else {
      return null;
    }
  }

}
