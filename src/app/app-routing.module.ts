import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AuthGuardService as AuthGuard } from './services/auth-guard/auth-guard.service';
import { AdminGuard } from './guards/admin.guard';
import { LoggedInAuthGuardService as LoggedInAuthGuard } from './services/logged-in-auth-guard/logged-in-auth-guard.service';
import { SettingsPageComponent } from './settings/containers/settings-page/settings-page.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsPageComponent, canActivate: [AdminGuard]},
  { path: 'login', component: LoginComponent, canActivate: [LoggedInAuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
