import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {BookService} from '../../services/book.service';
import {Author} from '../../models/author.model';
import {AuthorService} from "../../services/author.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import {BookUpdateService} from "../../services/book-update.service";

//Dialog for creating Books
@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
})
export class BookDialogComponent implements OnInit {
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
  onSave(): void {
    if (!this.selectedAuthor) {
      this.snackBar.open('Please select an author', 'Close');
      return;
    }
    this.bookService.createBook(this.bookTitle, this.selectedAuthor.id, this.bookGenre).subscribe(
      () => {
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


}
