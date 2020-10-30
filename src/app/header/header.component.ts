import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth/auth.service';
import { EventService } from '../services/event/event.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public appName: string;
  public isAdmin: boolean;
  public isAuthenticated: boolean;

  private eventEmitter: EventEmitter<any>;

  constructor(
    public authService: AuthService,
    public eventService: EventService,
    public router: Router
  ) {
    this.appName = _.get(environment, 'appName') || 'DefaultAppName';
    this.eventEmitter = eventService.getEventEmitter();
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.isAuthenticated = this.authService.isAuthenticated();

    this.eventEmitter.subscribe(item => {
      if (item?.logout) {
        this.isAuthenticated = false;
      } else if (item?.login) {
        this.isAuthenticated = true;
        this.isAdmin = item.isAdmin;
      }
    });
  }

  onLogout() {
    this.authService.logoutUser();
  }

  onSettings() {
    this.router.navigate(['settings']);
  }

}
