import { Component, Input, OnInit } from '@angular/core';
import { Prediction } from 'src/app/models/prediction';

@Component({
  selector: 'app-prediction-item',
  templateUrl: './prediction-item.component.html',
  styleUrls: ['./prediction-item.component.css']
})
export class PredictionItemComponent implements OnInit {
  @Input() prediction: Prediction;
  userImg: any;

  constructor() { }

  ngOnInit(): void {
    this.userImg = "";

    this.prediction = new Prediction(
      this.userImg,
      "2022-12-06T22:06:26.4950079Z",
      "cactus wren",
      98.60,
      "https://www.audubon.org/field-guide/bird/cactus-wren",
      "https://www.audubon.org/search_results?search=cactus%20wren"
    );

    }
}
