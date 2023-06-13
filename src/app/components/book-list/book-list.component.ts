import {Component, OnInit} from '@angular/core';
import {BookService} from '../../services/book.service';
import {Author} from '../../models/author.model';
import {Book} from '../../models/book.model';
import {AuthorService} from '../../services/author.service';
import {RentalService} from '../../services/rental.service';
import {BookUpdateService} from "../../services/book-update.service";
import {RentalUpdateService} from "../../services/rental-update.service";
import {AuthorUpdateService} from "../../services/author-update.service";

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
  authorSearchError: String = "";
  genreSearchButtonClicked = false;
  unavailableBooksSearchError : string="";
  availableBooksSearchError: string="";

  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private rentalService: RentalService,
    private bookUpdateService: BookUpdateService,
    private rentalUpdateService: RentalUpdateService,
    private authorUpdateService: AuthorUpdateService,

  ) {
  }

  ngOnInit() {
    this.getAvailableBooks();
    this.getUnavailableBooks();
    this.getAuthors();
    this.bookUpdateService.bookCreated$.subscribe(() => {
      this.getAvailableBooks();
      this.getUnavailableBooks();
    });
    this.rentalUpdateService.rentalCreated$.subscribe(() => {
      this.getAvailableBooks();
      this.getUnavailableBooks();
    })
    this.rentalUpdateService.rentalReturned$.subscribe(() => {
      this.getAvailableBooks();
      this.getUnavailableBooks();
    })
    this.authorUpdateService.authorCreated$.subscribe(() => {
      this.getAuthors();
    })
  }

  getAvailableBooks() {
    this.bookService.getAvailableBooks().subscribe(
      (books) => {
        this.availableBooks = books;
        if (books.length === 0) {
          this.availableBooksSearchError = 'No available Books Found.';
        } else {
          this.availableBooksSearchError = '';
        }
      },
      (error) => {
        console.error(error);
        this.unavailableBooks = [];
        this.unavailableBooksSearchError = 'Error occurred while searching for books.';
      }
    );
  }

  getUnavailableBooks() {
    this.bookService.getUnavailableBooks().subscribe(
      (books) => {
        this.unavailableBooks = books;
        if (books.length === 0) {
          this.unavailableBooksSearchError = 'No unavailable Books Found.';
        } else {
          this.unavailableBooksSearchError = '';
        }
      },
      (error) => {
        console.error(error);
        this.unavailableBooks = [];
        this.unavailableBooksSearchError = 'Error occurred while searching for books.';
      }
    );
  }

  getBooksByAuthor() {
    if (this.selectedAuthorId) {
      this.bookService.getBooksByAuthor(this.selectedAuthorId).subscribe(
        (books) => {
          this.selectedAuthorBooks = books;
          if (books.length === 0) {
            this.authorSearchError = 'No books found by Author.';
          } else {
            this.authorSearchError = '';
          }
        },
        (error) => {
          console.error(error);
          this.selectedAuthorBooks = [];
          this.authorSearchError = 'Error occurred while searching for books.';
        }
      );
    }
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
        console.error('Error:', error);
        this.booksByGenre = [];
        this.genreSearchError = 'Error occurred while searching for books.';
      }
    );
  }

  rentBook(book: Book) {
    this.rentalService.rentBook(book).subscribe(
      () => {
        this.rentalUpdateService.notifyRentalCreated()
      },
      (error) => {
        console.error(error);
      }
    );
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

  resetAuthorSelection() {
    this.selectedAuthorId = null;
    this.selectedAuthorBooks = [];
  }
}
