import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-queue-status',
  templateUrl: './queue-status.component.html',
  styleUrls: ['./queue-status.component.scss']
})
export class QueueStatusComponent implements OnInit {

  @Input() queueName: string;
  @Input() phoneNumber: string;
  @Input() callsWaiting: number;

  constructor() { }

  ngOnInit(): void {
  }

}
