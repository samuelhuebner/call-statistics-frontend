import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public appName: string;
  constructor(public authService: AuthService) {
    this.appName = _.get(environment, 'appName') || 'DefaultAppName';
  }

  ngOnInit(): void {
  }

  onLogout() {
    this.authService.logoutUser();
  }

}
