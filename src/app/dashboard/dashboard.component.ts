import { Component, OnDestroy, OnInit } from '@angular/core';

import { SocketioService } from '../services/socketio/socketio.service';
import { CallApiService } from  '../services/call-api/call-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy{

  socket: any;
  mainHotlineWaiting: number;
  hailHotlineWaiting: number;

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
