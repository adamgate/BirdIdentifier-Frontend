import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, retry, delay } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Prediction } from '../../models/prediction';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  public urlBase: string = environment.apiUrl;
  public birdClassificationV1Url: string = 'birds/identification/classify?version=1';
  public birdClassificationV2Url: string = 'birds/identification/classify?version=2';
  public birdPersonaUrl: string = 'birds/identification/persona';

  errorChangedEvent = new Subject<string>();
  predictionListChangedEvent = new Subject<Prediction[]>();
  predictions: Prediction[] = [];
  selectedEndpoint: string = this.birdClassificationV1Url;

  constructor(private httpClient: HttpClient) { }

  uploadImage(selectedFile) {
    const formData = new FormData();
    formData.append('image', selectedFile, selectedFile.name);

    // Send the post request to the backend
    this.httpClient.post<Prediction>(`${this.urlBase}/${this.selectedEndpoint}`, formData)
      .pipe(
        retry(3),
        delay(3000))
      .subscribe({
        next: (d) => {
          this.predictions.push(new Prediction(
            d['Timestamp'],
            d['Name'],
            d['Score'],
            d['LearnMoreLink']
          ));

          this.sendPredictionUpdate();
          this.sendErrorUpdate(null);
        },
        error: (e) => {
          this.sendErrorUpdate(`${e.statusText}. Code: ${e.status}`);
        }
      });
  }

  sendPredictionUpdate(): void {
    this.predictionListChangedEvent.next(this.predictions.slice())
  }

  sendErrorUpdate(error: string): void {
    this.errorChangedEvent.next(error);
  }

  getPredictions(): Prediction[] {
    return this.predictions;
  }

  // Get an individual prediction by the timestamp
  getPrediction(timestamp: string): Prediction {
    let prediction: Prediction = this.predictions.find(prediction => prediction.timestamp === timestamp);

    if (prediction !== undefined)
      return prediction;
    else
      return null;
  }

}
