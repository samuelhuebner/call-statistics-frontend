import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';

import { SettingsModule } from './settings/settings.module';

import { TokenInterceptorService as TokenInterceptor } from './services/token-interceptor/token-interceptor.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QueueStatusComponent } from './components/queue-status/queue-status.component';
import { CallComponent } from './components/call/call.component';
import { CurrentCallsComponent } from './components/current-calls/current-calls.component';

import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    DashboardComponent,
    QueueStatusComponent,
    CallComponent,
    CurrentCallsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatBadgeModule,
    MatIconModule,
    MatSnackBarModule,
    MatTableModule,
    SettingsModule
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
