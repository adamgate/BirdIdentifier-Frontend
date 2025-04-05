import { ConnectionCheckerService } from './connection-checker.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-connection-alert',
  templateUrl: './connection-alert.component.html',
  styleUrls: ['./connection-alert.component.css']
})
export class ConnectionAlertComponent implements OnInit {
  connectionStatus = ConnectionState.connecting;
  // Used for html component checks
  connectionState = ConnectionState;
  isHidden: boolean = false;

  constructor(private connectionService: ConnectionCheckerService) { }

  ngOnInit(): void {
    this.connectionService.checkConnectionStatus();

    this.connectionService.connectionStatusChangedEvent.subscribe(status => {
      this.connectionStatus = status;
    })
  }

  toggleIsHidden() {
    this.isHidden = !this.isHidden;
  }
}

export enum ConnectionState {
  connecting,
  failed,
  connected
}
