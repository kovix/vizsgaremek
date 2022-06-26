import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthResponse } from '../model/auth-response';
import { TokenTypes } from '../model/token-types';
import { User } from '../model/user';

const AUTHTOKENKEY = 'AUTHTOKEN';
const REFRESHTOKENKEY = 'REFRESHTOKEN';
const STOREDUNAME = 'REMEMBERNAME';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  private userDataSubject = new BehaviorSubject<User>(new User());

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get userData() {
    return this.userDataSubject.asObservable();
  }

  constructor(
    private router: Router,
  ) {
    const token = this.getToken(AUTHTOKENKEY);
    this.loggedIn.next(!!token);
  }

  public logOut(): void {
    this.clearTokens();
    this.loggedIn.next(false);
    this.router.navigate(['/', 'login']);
  }

  public setUserData(user: User): void {
    this.userDataSubject.next(user);
  }

  public saveNewAuthToken(data: string) {
    window.localStorage.setItem(TokenTypes.AUTHTOKEN, data);
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
    if(data.user) {
      this.userDataSubject.next(data.user);
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

  public getStoredUserName(): string {
    const item = window.localStorage.getItem(STOREDUNAME);
    return item || "";
  }

  public setStoredUserName(userName: string): void {
    window.localStorage.setItem(STOREDUNAME, userName);
  }

  public removeStoredUserName(): void {
    window.localStorage.removeItem(STOREDUNAME);
  }

}
