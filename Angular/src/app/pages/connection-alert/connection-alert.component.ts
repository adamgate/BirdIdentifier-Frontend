import { Component, OnInit } from '@angular/core';
import { ConnectionCheckerService } from './connection-checker.service';

@Component({
  selector: 'app-connection-alert',
  templateUrl: './connection-alert.component.html',
  styleUrls: ['./connection-alert.component.css']
})
export class ConnectionAlertComponent implements OnInit {
 connectionStatus = ConnectionState.connecting;

 // Used for html component checks
 connectionState = ConnectionState;

  constructor(private connectionService: ConnectionCheckerService) { }

  ngOnInit(): void {
    this.connectionService.checkConnectionStatus();

    this.connectionService.connectionStatusChangedEvent.subscribe(status => {
      this.connectionStatus = status;
    }) 
  }
}

export enum ConnectionState {
  connecting,
  failed,
  connected
}
