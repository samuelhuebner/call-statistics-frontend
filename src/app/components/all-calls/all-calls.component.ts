import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Call } from 'src/app/models/Call.model';

@Component({
  selector: 'app-all-calls',
  templateUrl: './all-calls.component.html',
  styleUrls: ['./all-calls.component.scss']
})
export class AllCallsComponent implements OnInit {

  @Input() public calls: Call[];

  public allCalls: MatTableDataSource<Call> = new MatTableDataSource<Call>();;
  public displayedColumns: string[] = ['status', 'callInit', 'callDirection', 'caller', 'destination', 'callTime', 'ringingTime'];
  constructor() {}

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.allCalls.data = this.calls;
  }

}
