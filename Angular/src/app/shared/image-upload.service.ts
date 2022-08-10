import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  public urlBase: string = "https://localhost:7110";

  // prediction: new Observable = of();

  constructor(private http: HttpClient) { }

  //Send an image to the ML model for identification
  imageUpload(selectedFile) {
    const formData = new FormData();
    formData.append('image', selectedFile, selectedFile.name);

    return this.http.post<string>(`${this.urlBase}/images`, formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe((data) => {
        return data;
      });
  }
}
