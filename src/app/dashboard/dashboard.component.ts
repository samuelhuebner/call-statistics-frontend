import { Component, OnDestroy, OnInit } from '@angular/core';

import { SocketioService } from '../services/socketio/socketio.service';
import { CallApiService } from '../services/call-api/call-api.service';

import { Call } from '../models/Call.model';
import { AuthService } from '../services/auth/auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
    socket: any;
    mainHotlineWaiting = 0;
    hailHotlineWaiting = 0;
    breakpoint: number;
    doubleWindowSize: number;

    public isAdminSession: boolean;
    public currentCalls: Call[];
    public todaysCalls: Call[];

    constructor(
        private socketService: SocketioService,
        private callApiService: CallApiService,
        private authService: AuthService,
    ) {}

    // when the dashboard component is no longer active we have to disconnect the socket connection
    ngOnDestroy(): void {
        this.socket.disconnect();
    }

    ngOnInit(): void {
        this.isAdminSession = this.authService.isAdmin();
        // when the dashboard is initialized we need to setup the socket connection
        // and register all event handlers for the socket connection
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

        this.socket.on('callInserted', this.processCall.bind(this));
        this.socket.on('callUpdated', this.processCall.bind(this));
        this.socket.on('callFinished', this.removeCall.bind(this));

        // the next step is to get the current calls from the api for the dashboard
        this.callApiService.getCurrentCalls().then((calls: Call[]) => {
            this.currentCalls = calls;
        });

        this.callApiService.getCalls().then((calls: Call[]) => {
            this.todaysCalls = calls;
        });

        // this is nessesary to resize the grid if we are in the mobile view!
        this.resizeGrid(window.innerWidth);
    }

    public onResize(event): void {
        this.resizeGrid(event.target.innerWidth);
    }

    public resizeGrid(windowSize: number): void {
        if (windowSize <= 620) {
            this.breakpoint = 1;
            this.doubleWindowSize = 1;
        } else if (windowSize <= 956) {
            this.doubleWindowSize = 1;
            this.breakpoint = 2;
        } else if (windowSize <= 1573) {
            this.breakpoint = 3;
            this.doubleWindowSize = 2;
        } else {
            this.doubleWindowSize = 2;
            this.breakpoint = 5;
        }
    }

    async getHotlineOneCallCount(): Promise<void> {
        this.callApiService.getWaiting('api/queue-status/hotline1').subscribe((data: any) => {
            this.mainHotlineWaiting = data.callsWaiting;
        });
    }

    async getHotlineTwoCallCount(): Promise<void> {
        this.callApiService.getWaiting('api/queue-status/hotline2').subscribe((data: any) => {
            this.hailHotlineWaiting = data.callsWaiting;
        });
    }

    private processCall(callId: string): void {
        this.callApiService.getCurrentCalls().then((res: Call[]) => (this.currentCalls = res));
    }

    private removeCall(callId: string): void {
        this.currentCalls = this.currentCalls.filter((item) => item.callId !== callId);
        setTimeout(this.delayed.bind(this), 1000);
    }

    private delayed(): void {
        this.callApiService.getCalls().then((res: Call[]) => {
            this.todaysCalls = res;
        });
    }

    public endCall(call: Call): void {
        this.callApiService.endCall(call.callId);
    }

    public resetHotline(hotlineId: number): void {
        this.callApiService.resetHotline(hotlineId);
    }
}
