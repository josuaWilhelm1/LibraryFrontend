import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {BookService} from '../../services/book.service';
import {Author} from '../../models/author.model';
import {AuthorService} from "../../services/author.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import {BookUpdateService} from "../../services/book-update.service";

@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
})
export class BookDialogComponent {
  bookTitle: string = '';
  selectedAuthor: Author | undefined;
  authors: Author[] = [];
  bookGenre: string = '';

  constructor(
    public dialogRef: MatDialogRef<BookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bookService: BookService,
    private authorService: AuthorService,
    private snackBar: MatSnackBar,
    private bookUpdateService: BookUpdateService,
  ) {
  }

  ngOnInit() {
    this.getAuthors();
  }

  onSave(): void {
    if (!this.selectedAuthor) {
      this.snackBar.open('Please select an author', 'Close');
      return;
    }

    this.bookService.createBook(this.bookTitle, this.selectedAuthor.id, this.bookGenre).subscribe(
      (response) => {
        this.bookUpdateService.notifyBookCreated();
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error saving book:', error);
      }
    );
  }


  onCancel(): void {
    this.dialogRef.close();
  }

  getAuthors() {
    this.authorService.getAuthors().subscribe(
      (authors) => {
        this.authors = authors;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}