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

  constructor() { }

  ngOnInit(): void { }

  onTryAgain() {
    this.tryAgain.emit();
  }
}
