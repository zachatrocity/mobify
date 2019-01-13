import { Component, OnInit, EventEmitter } from '@angular/core';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions, UploadStatus } from 'ngx-uploader';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver';
@Component({
  selector: 'mob-file-upload',
  templateUrl: './mob-file-upload.component.html',
  styleUrls: ['./mob-file-upload.component.scss']
})
export class MobFileUploadComponent implements OnInit {

  users: { name: string, title: string }[] = [
    { name: 'Carla Espinosa', title: 'Nurse' },
    { name: 'Bob Kelso', title: 'Doctor of Medicine' },
    { name: 'Janitor', title: 'Janitor' },
    { name: 'Perry Cox', title: 'Doctor of Medicine' },
    { name: 'Ben Sullivan', title: 'Carpenter and photographer' },
  ];

  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  dragOver: boolean;
  options: UploaderOptions;

  constructor(private _http: HttpClient) {
    this.options = { concurrency: 10, maxUploads: 10 };
    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>();
  }

  ngOnInit() {

  }

  public status(value) {
    if (value <= 25) {
      return 'danger';
    } else if (value <= 50) {
      return 'warning';
    } else if (value <= 75) {
      return 'info';
    } else {
      return 'success';
    }
  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') {
      this.startUpload();
    } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
      this.files.push(output.file);
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.name === output.file.name);
      this.files[index] = output.file;
    } else if (output.type === 'cancelled' || output.type === 'removed') {
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    } else if (output.type === 'rejected' && typeof output.file !== 'undefined') {
      console.log(output.file.name + ' rejected');
    } else if (output.type === 'done') {
      console.log(output);
      let filename = '';
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const matches = filenameRegex.exec(output.file.responseHeaders['content-disposition']);
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, '');
      }
      this.downloadFile(
        output.file.response,
        output.file.responseHeaders['content-type'],
        filename
      );
    }

    // this.files = this.files.filter(file => file.progress.status !== UploadStatus.Done);
  }

  downloadFile(data: any, type: any, filename: any) {
    const blob = new Blob([data], { type: type });
    saveAs(blob, filename);
  }

  startUpload(): void {
    const event: UploadInput = {
      type: 'uploadAll',
      url: '/api/upload/files',
      method: 'POST',
      data: { foo: 'bar' }
    };

    this.uploadInput.emit(event);
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }

  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });

  }
}
