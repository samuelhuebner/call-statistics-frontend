import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt'; 

import { User } from '../../models/User.model';
import { AuthResponse } from '../../models/AuthResponse.model';

import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = `${environment.baseUrl}/auth/login`
  private loggedInUser: User;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) { }


  public async loginUser(user: User) {
    const res = await this.http.post<AuthResponse>(this.loginUrl, {
      username: user.username,
      password: user.password
    }).toPromise();
    localStorage.setItem('token', res.token);
    this.loggedInUser = {
      username: res.user.username,
      password: res.user.password
    }
  }

  public async createUser(user: User) {
    console.log('creating user');
    //TODO:
  }

  public logoutUser() {
    localStorage.removeItem('token');
    delete this.loggedInUser;
    this.router.navigate(['login']);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    return !this.jwtHelper.isTokenExpired(token);
  }


}
