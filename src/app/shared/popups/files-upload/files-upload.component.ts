import { Component } from '@angular/core';

@Component({
  selector: 'app-files-upload',
  templateUrl: './files-upload.component.html',
  styleUrls: ['./files-upload.component.css']
})
export class FilesUploadComponent {
  isHovering !: boolean;

  constructor() {}

  toggleHover(event: boolean) {
    this.isHovering = event;
  }
}
