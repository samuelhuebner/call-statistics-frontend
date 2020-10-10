import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CallApiService {

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

  constructor(
    private httpClient: HttpClient
  ) { }
}
