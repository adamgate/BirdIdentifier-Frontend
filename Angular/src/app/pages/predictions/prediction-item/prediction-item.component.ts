import { Component, Input, OnInit } from '@angular/core';
import { Prediction } from 'src/app/models/prediction';

@Component({
  selector: 'app-prediction-item',
  templateUrl: './prediction-item.component.html',
  styleUrls: ['./prediction-item.component.css']
})
export class PredictionItemComponent implements OnInit {
  @Input() prediction: Prediction;

  constructor() { }

  ngOnInit(): void {
    // this.prediction = new Prediction('','','ruby throated hummingbird', 55.5,'https://www.google.com/search?q=ruby+throated+hummingbird+bird');
    this.prediction = new Prediction('','','', 0,'');
  }
}
