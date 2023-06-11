import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Author } from '../../models/author.model';
import { Book } from '../../models/book.model';
import { AuthorService } from '../../services/author.service';
import { RentalService } from '../../services/rental.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  availableBooks: Book[] = [];
  unavailableBooks: Book[] = [];
  selectedAuthorId: number | null = null;
  authors: Author[] = [];
  selectedAuthorBooks: Book[] = [];
  booksByGenre: Book[] = [];
  genreSearchText: string = "";
  genreSearchError: string = "";
  genreSearchButtonClicked = false;

  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private rentalService: RentalService
  ) {}

  ngOnInit() {
    this.getAvailableBooks();
    this.getUnavailableBooks();
    this.getAuthors();
  }

  getAvailableBooks() {
    this.bookService.getAvailableBooks().subscribe(
      (books) => {
        this.availableBooks = books;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getUnavailableBooks() {
    this.bookService.getUnavailableBooks().subscribe(
      (books) => {
        this.unavailableBooks = books;
      },
      (error) => {
        console.log(error);
      }
    );
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

  getBooksByAuthor() {
    if (this.selectedAuthorId) {
      this.bookService.getBooksByAuthor(this.selectedAuthorId).subscribe(
        (books) => {
          this.selectedAuthorBooks = books;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  resetAuthorSelection() {
    this.selectedAuthorId = null;
    this.selectedAuthorBooks = [];
  }

  getBooksByGenre() {
    this.bookService.getBooksByGenre(this.genreSearchText).subscribe(
      (books) => {
        this.booksByGenre = books;
        this.genreSearchButtonClicked = true;
        if (books.length === 0) {
          this.genreSearchError = 'No books found by genre.';
        } else {
          this.genreSearchError = '';
        }
      },
      (error) => {
        console.log('Error:', error);
        this.booksByGenre = [];
        this.genreSearchError = 'Error occurred while searching for books.';
      }
    );
  }

  rentBook(book: Book) {
    this.rentalService.rentBook(book).subscribe(
      () => {
        console.log(`Book rented: ${book.title}`);
        // Perform any additional operations after renting the book
      },
      (error) => {
        console.log(error);
        // Handle any error that occurred during the rental process
      }
    );
  }
}
