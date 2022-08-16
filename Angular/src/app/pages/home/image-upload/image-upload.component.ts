import { Component, OnInit } from '@angular/core';
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
  prediction: string = null;

  constructor(private imageUploadService: ImageUploadService) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    if (!this.selectedFile) {
      return;
    }

    var fileExt = this.getExtension(this.selectedFile.name);

    this.validFile = this.isImage(fileExt);
  }

  onUpload() {
    if (this.onFileSelected.length === 0)
      return;
    
   this.imageUploadService.imageUpload(<File>this.selectedFile);

   console.log('prediction: ' + this.prediction);

    if (this.prediction) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = (_event) => {
        this.userImage = reader.readAsDataURL.toString();
      }
    }
  }

   getExtension(filename: string) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
   }

   isImage(ext: string) {
    switch (ext.toLowerCase()) {
      case 'jpg':
      case 'jpeg':
      case 'png':
        return true;
    }
    return false;
  }


}
