import { Component, EventEmitter, Input, Output } from '@angular/core';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import { dataURLtoFile } from '../../utils';

@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.css']
})
export class CropperComponent {
  @Input() imageFile!: File;

  @Output() changed = new EventEmitter<File>();

  croppedImage!: string;

  constructor() {}

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64 as string;
  }

  onCrop() {
    const file = dataURLtoFile(this.croppedImage, this.imageFile);
    this.changed.emit(file);
  }
}
