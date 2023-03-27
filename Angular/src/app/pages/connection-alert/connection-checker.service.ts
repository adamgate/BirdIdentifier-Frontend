import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, retry, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConnectionState } from './connection-alert.component';

@Injectable({
  providedIn: 'root'
})
export class ConnectionCheckerService {
  public urlBase: string = environment.apiUrl;

  connectionStatusChangedEvent = new Subject<ConnectionState>();
  connectionStatus: ConnectionState = ConnectionState.connecting;

  constructor(private httpClient: HttpClient) { }

  async checkConnectionStatus() {
    await this.httpClient.get(`${this.urlBase}/heartbeat`)
      .pipe(
        retry(3),
        delay(3000))
      .subscribe({
        next: (d) => {
          this.connectionStatus = ConnectionState.connected;
          this.send();
        },
        error: (e) => {
          this.connectionStatus = ConnectionState.failed;
          this.send();
        }
      });

  }

  send(): void {
    this.connectionStatusChangedEvent.next(this.connectionStatus);
  }
}
