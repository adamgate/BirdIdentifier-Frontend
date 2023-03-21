import { Component, OnInit, Input, Output } from '@angular/core';

import { Prediction } from 'src/app/models/prediction';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() prediction: Prediction;

  constructor() { }

  ngOnInit(): void {
  }

  updatePrediction(prediction: Prediction) {
    this.prediction = prediction;
  }

}
