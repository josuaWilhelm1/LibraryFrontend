import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookService } from '../../services/book.service';
import { Author } from '../../models/author.model';
import { AuthorService } from "../../services/author.service";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
})
export class BookDialogComponent {
  bookTitle: string = '';
  selectedAuthor: Author | undefined;
  authors: Author[] = [];

  constructor(
    public dialogRef: MatDialogRef<BookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bookService: BookService,
    private authorService: AuthorService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getAuthors();
  }

  onSave(): void {
    if (!this.selectedAuthor) {
      this.snackBar.open('Please select an author', 'Close');
      return;
    }

    // Call the bookService.createBook method with the book title and author ID
    const authorId: number = this.selectedAuthor.id;
    this.bookService.createBook(this.bookTitle, authorId);

    // Close the dialog
    this.dialogRef.close();
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
        console.log(error);
      }
    );
  }
}
