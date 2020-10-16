import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Call } from '../../models/Call.model';

@Injectable({
  providedIn: 'root'
})
export class CallApiService {
  constructor(
    private httpClient: HttpClient
  ) { }

  public getWaiting(endpoint?: string) {
    let apiURL = environment.baseUrl;

    if (endpoint && endpoint.length !== 0) {
      apiURL = `${apiURL}/${endpoint}`;
    } else {
      apiURL = environment.baseUrl + '/api/queue-status';
    }

    return this.httpClient.get(apiURL);
  }

  public getCallPickupQuota(endpoint?: string) {

  }

  public getCurrentCalls(): Promise<Call[]> {
    const apiURL = `${environment.baseUrl}/api/call-stats/current`;

    return this.httpClient.get<Call[]>(apiURL)
      .toPromise()
  }

  public getCall(callId: string): Promise<Call> {
    const apiURL = `${environment.baseUrl}/api/call-stats/current/${callId}`;

    return this.httpClient.get<Call>(apiURL)
      .toPromise();
  }
}
