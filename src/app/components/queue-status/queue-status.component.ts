import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-queue-status',
    templateUrl: './queue-status.component.html',
    styleUrls: ['./queue-status.component.scss'],
})
export class QueueStatusComponent implements OnInit {
    @Input() queueName: string;
    @Input() phoneNumber: string;
    @Input() callsWaiting: number;
    @Input() adminSession: boolean;

    @Output() resetEvent = new EventEmitter<boolean>();

    constructor() {}

    ngOnInit(): void {}

    public triggerReset(): void {
        this.resetEvent.emit(true);
    }
}
