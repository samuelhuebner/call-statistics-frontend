import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../services/auth/auth.service';

import { User } from '../models/User.model';
import { LoadingIndicatorService } from '../services/loading-indicator/loading-indicator.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    hide = true;

    constructor(
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar,
        private loadingIndicatorService: LoadingIndicatorService,
    ) {}

    ngOnInit(): void {}

    onSubmit(user: User): void {
        this.loadingIndicatorService.show();
        this.authService
            .loginUser(user)
            .then(async () => {
                await this.router.navigate(['dashboard']);
                this.loadingIndicatorService.hide();
            })
            .catch((error) => {
                const internalMsg = error?.error?.error?.internalMsg || error?.error?.error?.name;
                if (internalMsg === 'Invalid password!') {
                    this.snackBar.open('Wrong password! Try again.', 'Okay', { duration: 3000 });
                } else if (internalMsg === 'User not found!') {
                    this.snackBar.open('User not found!', 'Okay', { duration: 3000 });
                } else {
                    console.error(error);
                    this.snackBar.open('Unknown error during login!', 'Okay', { duration: 3000 });
                }

                this.loadingIndicatorService.hide();
            });
    }
}
