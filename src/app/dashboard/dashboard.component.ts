import { Component, OnDestroy, OnInit } from '@angular/core';

import { SocketioService } from '../services/socketio/socketio.service';
import { CallApiService } from  '../services/call-api/call-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  socket: any;
  mainHotlineWaiting = 0;
  hailHotlineWaiting = 0;
  breakpoint;
  doubleWindowSize;

  constructor(
    private socketService: SocketioService,
    private callApiService: CallApiService
  ) { }

  // when the dashboard component is no longer active we have to disconnect the socket connection
  ngOnDestroy(): void {
    this.socket.disconnect();
  }

  ngOnInit(): void {
    this.socketService.setupSocketConnection();
    this.socket = this.socketService.socket;

    this.socket.on('updatehotline1', () => {
      this.getHotlineOneCallCount();
    });

    this.socket.on('update', () => {
      this.getHotlineOneCallCount();
      this.getHotlineTwoCallCount();
    });

    this.socket.on('updatehotline2', () => {
      this.getHotlineTwoCallCount();
    });

    this.resizeGrid(window.innerWidth);
  }

  onResize(event) {
    this.resizeGrid(event.target.innerWidth);
  }

  resizeGrid(windowSize: number) {
    if (windowSize <= 620) {
      this.breakpoint = 1;
      this.doubleWindowSize = 1;
    } else if (windowSize <= 956) {
      this.doubleWindowSize = 1;
      this.breakpoint = 2;
    } else if (windowSize <= 1573) {
      this.breakpoint = 3;
    } else {
      this.doubleWindowSize = 2;
      this.breakpoint = 5;
    }
  }

  async getHotlineOneCallCount() {
    this.callApiService.getWaiting('api/queue-status/hotline1').subscribe((data: any) => {
      this.mainHotlineWaiting = data.callsWaiting;
    });
  }

  async getHotlineTwoCallCount() {
    this.callApiService.getWaiting('api/queue-status/hotline2').subscribe((data: any) => {
      this.hailHotlineWaiting = data.callsWaiting;
    });
  }

}
