import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Call } from '../../models/Call.model';
import { User } from '../../models/User.model';

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

  public endCall(callId: string): Promise<any> {
    const apiURL = `${environment.baseUrl}/api/call-stats/current/`;

    return this
      .httpClient
      .post(apiURL, { callId })
      .toPromise();
  }

  /**
   * attempts to reset a hotline with the backend
   */
  public resetHotline(hotlineId: number): Promise<any> {
    const apiURL = `${environment.baseUrl}/api/queue-status/hotline/reset/`;

    return this
      .httpClient
      .post(apiURL, { hotlineId })
      .toPromise();
  }

  public getCalls(): Promise<Call[]> {
    const apiURL = `${environment.baseUrl}/api/call-stats/calls`;
    return this
      .httpClient
      .get<Call[]>(apiURL)
      .toPromise();
  }

  public getUsers(): Promise<User[]> {
    const apiURL = `${environment.baseUrl}/api/admin/users/`;
    return this.httpClient.get<User[]>(apiURL)
      .toPromise();
  }
}
