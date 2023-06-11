import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AuthorService} from "../../services/author.service";

@Component({
  selector: 'app-author-dialog',
  templateUrl: './author-dialog.component.html',
})
export class AuthorDialogComponent {
  authorName: string = '';

  constructor(
    public dialogRef: MatDialogRef<AuthorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authorService: AuthorService,
  ) {
  }

  onSave(): void {
    this.authorService.createAuthor(this.authorName);
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
