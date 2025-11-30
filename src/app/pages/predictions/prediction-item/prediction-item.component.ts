import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Prediction } from 'src/app/models/prediction';

@Component({
  selector: 'app-prediction-item',
  templateUrl: './prediction-item.component.html',
  styleUrls: ['./prediction-item.component.css']
})
export class PredictionItemComponent implements OnInit {
  @Input() prediction: Prediction;
  @Output() tryAgain = new EventEmitter<void>();
  isABird: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.isABird = this.prediction.name !== 'not bird'
  }

  onTryAgain() {
    this.tryAgain.emit();
  }
}
