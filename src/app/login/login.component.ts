import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth/auth.service';

import { User } from '../models/User.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  onSubmit(user: User) {
    this.authService.loginUser(user)
      .then(() => {
        this.router.navigate(['dashboard']);
      })
      .catch();
  }

}
