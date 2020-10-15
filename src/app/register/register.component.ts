import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User.model';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onSubmit(user: User) {
    this.authService.createUser(user)
      .then(() => {
        this.router.navigate(['login']);
      })
      .catch((error) => {
        console.log(error);
        this.snackBar.open("registration failed", "Okay", { duration: 2000 });
        console.log('registration failed');
      });
  }

}
