import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User.model';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingIndicatorService } from '../services/loading-indicator/loading-indicator.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
    hide = true;

    constructor(
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar,
        private loadingIndicatorService: LoadingIndicatorService,
    ) {}

    onSubmit(user: User): void {
        this.loadingIndicatorService.show();
        this.authService
            .createUser(user)
            .then(() => {
                this.loadingIndicatorService.hide();
                this.router.navigate(['login']);
                this.snackBar.open('Please verify your account with the email we sent you', 'Okay', { duration: 3000 });
            })
            .catch((error) => {
                const internalMsg = error?.error?.error?.internalMsg || error?.error?.error?.name;
                if (internalMsg === 'Not allowed domain') {
                    this.snackBar.open('Invalid domain name', 'Okay', { duration: 3000 });
                } else if (internalMsg === 'SequelizeUniqueConstraintError') {
                    this.snackBar.open('User with such an email already exists', 'Okay', { duration: 3000 });
                } else {
                    this.snackBar.open('Unknown error during registering', 'Okay', { duration: 3000 });
                }
                this.loadingIndicatorService.hide();
            });
    }
}
