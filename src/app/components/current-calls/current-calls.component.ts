import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { Call } from 'src/app/models/Call.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EventService } from 'src/app/services/event/event.service';

@Component({
    selector: 'app-current-calls',
    templateUrl: './current-calls.component.html',
    styleUrls: ['./current-calls.component.scss'],
})
export class CurrentCallsComponent implements OnInit, OnChanges {
    @Input() public currentCallsInput: Call[];
    @Input() private newCall: Call;

    @Output() removeCall = new EventEmitter<Call>();

    public currentCalls = new MatTableDataSource<Call>();
    public displayedColumns: string[] = ['callInit', 'callDirection', 'caller', 'status', 'callPickup', 'destination'];

    public showDeleteButton = false;
    public isAdmin: boolean;

    private eventEmitter: EventEmitter<any>;

    constructor(private events: EventService, private authService: AuthService) {
        this.eventEmitter = events.getEventEmitter();
    }

    ngOnInit(): void {
        this.isAdmin = this.authService.isAdmin();
        this.eventEmitter.subscribe((item) => {
            if (item?.logout) {
                this.isAdmin = false;
            } else if (item?.login) {
                this.isAdmin = item.isAdmin;
            }
        });
    }

    ngOnChanges(): void {
        this.currentCalls.data = this.currentCallsInput;
    }

    endCall(call: Call) {
        this.removeCall.emit(call);
    }

    setVisible() {
        this.showDeleteButton = true;
    }

    setInvisible() {
        this.showDeleteButton = false;
    }
}
