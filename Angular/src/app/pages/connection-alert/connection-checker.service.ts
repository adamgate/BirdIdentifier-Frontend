import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConnectionCheckerService {
  public urlBase: string = environment.apiUrl;

  connectionStatusChangedEvent = new Subject<boolean>();
  connectionStatusOk: boolean = false;

  constructor(private httpClient: HttpClient) { }

  async checkConnectionStatus() {
    await this.httpClient.get(`${this.urlBase}/heartbeat`, {observe: 'response'})
      .subscribe(data => {
        if (data.status === 200 || data.ok === true) 
          this.connectionStatusOk = true;

        else
          this.connectionStatusOk = false;

          this.send();
      });
  }

  send() : void {
    this.connectionStatusChangedEvent.next(this.connectionStatusOk);
  }
}
