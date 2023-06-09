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

  errorChangedEvent = new Subject<string>();
  predictionListChangedEvent = new Subject<Prediction[]>();
  predictions: Prediction[] = [];

  constructor(private httpClient: HttpClient) { }

  /*
   * Send an image to the backend for identification.
   */
  uploadImage(selectedFile) {
    // Load image into proper format for a post
    const formData = new FormData();
    formData.append('image', selectedFile, selectedFile.name);

    // Send the post request to the backend
    this.httpClient.post<Prediction>(`${this.urlBase}/images`, formData)
    .pipe(
      retry(3),
      delay(3000))
    .subscribe({
      next: (d) => {
        this.predictions.push(new Prediction(
          d['ImageChecksum'],
          d['Timestamp'],
          d['PredictionName'],
          d['PredictionScore'],
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

  sendPredictionUpdate() : void {
    this.predictionListChangedEvent.next(this.predictions.slice())
  }

  sendErrorUpdate(error: string) : void {
    this.errorChangedEvent.next(error);
  }

  getPredictions() : Prediction[] {
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
