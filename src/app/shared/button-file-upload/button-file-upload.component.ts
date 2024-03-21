import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-button-file-upload",
  standalone: true,
  imports: [],
  templateUrl: "./button-file-upload.component.html",
  styleUrl: "./button-file-upload.component.css",
})
export class ButtonFileUploadComponent {
  @Input() controlName!: string;
  @Input() texto!: string;
  @Output() fileChange = new EventEmitter<File>();

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileChange.emit(file);
    }
  }
}
