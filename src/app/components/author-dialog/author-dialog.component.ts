import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AuthorService} from "../../services/author.service";
import {AuthorUpdateService} from "../../services/author-update.service";

//Dialog for creating Authors
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
    private authorUpdateService: AuthorUpdateService
  ) {
  }

  onSave(): void {
    this.authorService.createAuthor(this.authorName).subscribe(
      () => {
        this.authorUpdateService.notifyAuthorCreated();
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error saving author:', error);
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
