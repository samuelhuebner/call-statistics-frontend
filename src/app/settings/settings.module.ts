import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';


import { SettingsPageComponent } from './containers/settings-page/settings-page.component';
import { CurrentUsersComponent } from './containers/current-users/current-users.component';
import { UserComponent } from './components/user/user.component';

@NgModule({
  declarations: [
    SettingsPageComponent,
    CurrentUsersComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    MatTableModule
  ],
  exports: [
    CurrentUsersComponent,
    SettingsPageComponent,
    UserComponent
  ]
})
export class SettingsModule { }
