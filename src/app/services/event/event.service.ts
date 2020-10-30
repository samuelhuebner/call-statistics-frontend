import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventEmitter: EventEmitter<any>;

  constructor() {
    this.eventEmitter = new EventEmitter();
  }

  public getEventEmitter(): EventEmitter<any> {
    return this.eventEmitter;
  }
}
