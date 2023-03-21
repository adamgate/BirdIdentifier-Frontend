import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Prediction } from 'src/app/models/prediction';
import { ImageUploadService } from 'src/app/shared/image-upload.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  selectedFile: File = null;
  validFile: boolean = false;

  userImage: string = null;
  url: string;
  predictions: Prediction[] = [];
  @Output() latestPrediction = new EventEmitter<Prediction>();

  constructor(private imageUploadService: ImageUploadService) { }

  ngOnInit(): void {
    this.predictions = this.imageUploadService.getPredictions();
    this.imageUploadService.predictionListChangedEvent.subscribe(result => {
      this.predictions = result;
      this.addLatestPrediction(this.predictions[this.predictions.length-1]);
    })
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

    const reader = new FileReader();
    this.userImage = event.target.file;
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (_event) => {
      this.url = reader.result as string;
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

addLatestPrediction(prediction: Prediction) {
  prediction.img = this.url;
  this.latestPrediction.emit(prediction);
}

}
