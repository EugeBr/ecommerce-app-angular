import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  multiple: boolean;
  crop: boolean;
}

@Component({
  selector: 'app-files-upload',
  templateUrl: './files-upload.component.html',
  styleUrls: ['./files-upload.component.css']
})
export class FilesUploadComponent {
  isHovering !: boolean;

  files : File[] = [];
  imageFile!: File | null;
  isError!: boolean;

  filesURLs : string[] = [];

  constructor(
    private dialogRef: MatDialogRef<FilesUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  toggleHover(event: boolean | any) {
    this.isHovering = event;
  }

  onDrop(files: FileList | any): void {
    this.dropGeneral(files);
  }

  onDropFile(files: FileList | any): void {
    this.dropGeneral(event.target.files);
  }

  dropGeneral(files: FileList): void {
    this.isError = false;

    if(this.data.crop && files.length>1) {
      this.isError = true;
      return;
    }

    if(this.data.crop && files.length === 1 && files.item(0)?.type.split('/')[0] === 'image') {
      this.imageFile = files.item(0) as File;
      return;
    }

    for(let i=0; i < files.length; i++) {
      this.files.push(files.item(i) as File);
    }

    console.log(files);
    
  }

  onUploadComplete(url: string) : void {
    this.filesURLs.push(url);
  }

  onComplete(): void {
    const res = this.data.multiple ? this.filesURLs : this.filesURLs[0];
    this.dialogRef.close(res);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onCrop(file: File): void {
    this.imageFile = null;
    this.files.push(file);
  }

}
