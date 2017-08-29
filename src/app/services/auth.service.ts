import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { IUser } from 'app/models/user';
import { HelperService } from "./helper.service";

@Injectable()

export class AuthService {
  currentUser: IUser;

  constructor(
    private _http: Http,
    private _helper: HelperService
    ) {}

  register(user: IUser): Promise<void> {
    const url = `/api/auth/register`;
    return this._http.post(url, user)
      .do (response => {
        const token = this._helper.getAuthTokenFromHeader(response);
        window.localStorage.setItem('token', token);
      })
      .map(response => response.json())
      .do((json) => this.updateCurrentUser(json))
      .toPromise();
  }

  login(user: IUser): Promise<boolean> {
    const url = `/api/auth/login`;
    return this._http.post(url, user)
      .do(response => {
        const token = this._helper.getAuthTokenFromHeader(response);
        window.localStorage.setItem('token', token);
      })
      .map(response => response.json())
      .do(authorizedUser => this.updateCurrentUser(authorizedUser))
      .toPromise();
  }

  logout(): Promise<void> {
    const options = this._helper.addAuthTokenToHeader();
    const url = `/api/auth/logout`;

    return this._http.delete(url, options)
      .toPromise()
      .then(() => {
        this.currentUser = undefined;
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('username');
      })
      .catch(e => console.log(e));
  }

  updateCurrentUser(user: IUser) {
    console.log('USER', user);
    const { username } = user;
    this.currentUser = user;
    window.localStorage.setItem('username', username);
  }

  isValidated(): string {
    const token = window.localStorage.getItem('token');
    const username = window.localStorage.getItem('username');

    if (token && username) {
      this.currentUser = {username};
      return username;
    }
    return null;
  }


}
