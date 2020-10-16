import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { Call } from 'src/app/models/Call.model';

@Component({
  selector: 'app-current-calls',
  templateUrl: './current-calls.component.html',
  styleUrls: ['./current-calls.component.scss']
})
export class CurrentCallsComponent implements OnInit, OnChanges {

  @Input() public currentCallsInput: Call[];
  @Input() private newCall: Call;

  public currentCalls = new MatTableDataSource<Call>();

  public displayedColumns: string[] = ['callInit', 'callDirection', 'caller', 'status', 'callPickup', 'destination'];


  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.currentCalls.data = this.currentCallsInput;
  }

}
