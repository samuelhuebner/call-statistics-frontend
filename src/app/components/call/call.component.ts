import { Component, Input, OnInit } from '@angular/core';
import { Call } from 'src/app/models/Call.model';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss']
})
export class CallComponent implements OnInit {

  @Input() call: Call;

  constructor() { }

  ngOnInit(): void {
  }

}
