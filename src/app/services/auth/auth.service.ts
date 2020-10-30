import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EventService } from '../event/event.service';

import { User } from '../../models/User.model';
import { AuthResponse } from '../../models/AuthResponse.model';

import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private signUpUrl = `${environment.baseUrl}/auth/signup`;
  private loginUrl = `${environment.baseUrl}/auth/login`;
  private loggedInUser: User;
  private eventEmitter: EventEmitter<any>;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private eventService: EventService
  ) {
    this.eventEmitter = eventService.getEventEmitter();
  }


  public async loginUser(user: User) {
    const res = await this.http.post<AuthResponse>(this.loginUrl, {
      username: user.username,
      password: user.password
    }).toPromise();
    localStorage.setItem('token', res.token);
    localStorage.setItem('userId', String(res.user.id));
    localStorage.setItem('isAdmin', String(Boolean(res.user.isAdmin)));

    this.loggedInUser = {
      id: res.user.id,
      username: res.user.username,
      password: res.user.password,
      isAdmin: Boolean(res.user.isAdmin)
    }

    this.eventEmitter.emit({
      login: 1,
      userId: res.user.id,
      userName: res.user.name,
      isAdmin: res.user.isAdmin
    });
  }

  public createUser(user: User) {
    return this.http.post<Object>(this.signUpUrl, {
        username: user.username,
        password: user.password,
        name: user.name
      }).toPromise();
  }

  public isAdmin(): boolean {
    return 'true' === localStorage.getItem('isAdmin');
  }

  public logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('isAdmin');
    delete this.loggedInUser;
    this.eventEmitter.emit({ logout: 1 });
    this.router.navigate(['login']);
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();

    return !this.jwtHelper.isTokenExpired(token);
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public getLoggedInUser(): User {
    return this.loggedInUser;
  }
}
