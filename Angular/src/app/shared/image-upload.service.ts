import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Prediction } from '../models/prediction';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  public urlBase: string = environment.apiUrl;

  prediction: Prediction;

  constructor(private httpClient: HttpClient) { }

  //Send an image to the ML model for identification
  async uploadImage(selectedFile) : Promise<Prediction> {
    const formData = new FormData();
    formData.append('image', selectedFile, selectedFile.name);

    this.httpClient.post<IPrediction>(`${this.urlBase}/images`, formData)
    .subscribe(data => {
      this.prediction = new Prediction(
        data.ExactLink,
        data.Timestamp,
        data.PredictionName,
        data.PredictionScore,
        data.ExactLink,
        data.SearchLink
      )

      console.log(this.prediction);
      return this.prediction;
    });

    return null;
  }
}

  interface IPrediction {
    ImageChecksum: string,
    Timestamp: string,
    PredictionName: string,
    PredictionScore: number,
    ExactLink: string,
    SearchLink: string
}
