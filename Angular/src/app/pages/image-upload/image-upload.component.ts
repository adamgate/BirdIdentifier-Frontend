import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Prediction } from 'src/app/models/prediction';
import { ImageUploadService } from 'src/app/pages/image-upload/image-upload.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  fileName: string = null;
  selectedFile: File = null;
  validFile: boolean = false;
  img: string = null;
  error: string = null;
  loading: boolean = false;

  predictions: Prediction[] = [];
  @Output() latestPrediction = new EventEmitter<Prediction>();

  constructor(private imageUploadService: ImageUploadService) { }

  ngOnInit(): void {
      this.predictions = this.imageUploadService.getPredictions();

      this.imageUploadService.predictionListChangedEvent.subscribe(result => {
        this.predictions = result;
        this.addLatestPrediction(this.predictions[this.predictions.length - 1]);

        //Turn the loading spinner off
        this.switchLoading();
    });

    this.imageUploadService.errorChangedEvent.subscribe(error => {
      this.error = error;

      //Turn the loading spinner off
      if (error != null) {
        this.switchLoading();
      }
    });
  }

  /*
   * Ensure that a file has been selected, and that it's valid.
   */
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    if (!this.selectedFile) {
      return;
    }

    var fileExt = this.getExtension(this.selectedFile.name);

    this.validFile = this.isImage(fileExt);
    this.fileName = this.selectedFile.name;

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (_event) => {
      this.img = reader.result as string;
    }
  }

  /*
   * Validate file and then have image upload service handle uploading it.
   */
  onUpload() {
    if (this.onFileSelected.length === 0)
      return;

    this.imageUploadService.uploadImage(<File>this.selectedFile);
  }

  /*
   * Get a file's extension.
   */
  getExtension(filename: string) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
  }

  /*
   * Ensure that a given file extension is an image.
   */
  isImage(ext: string) {
    switch (ext.toLowerCase()) {
      case 'jpg':
      case 'jpeg':
      case 'jpe':
      case 'jif':
      case 'png':
        return true;
    }
    return false;
  }

  // Send prediction up to the home component to be sent to the prediction component
  addLatestPrediction(prediction: Prediction) {
    this.latestPrediction.emit(prediction);
  }

  // Turn the loading spinner on or off
  switchLoading() {
    this.loading = !this.loading;
  }
}
