import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { Author } from '../models/author.model';
import {RentalData} from "../models/rentalData.model";
import {BookData} from "../models/bookData.model";


@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrlAll = 'http://localhost:8080/v1/books';
  private baseUrlOne = 'http://localhost:8080/v1/book';


  constructor(private http: HttpClient) {}

  getAvailableBooks(): Observable<Book[]> {
    const url = `${this.baseUrlAll}/available`;
    return this.http.get<Book[]>(url);
  }

  getUnavailableBooks(): Observable<Book[]> {
    const url = `${this.baseUrlAll}/unavailable`;
    return this.http.get<Book[]>(url);
  }

  getBooksByAuthor(authorId: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrlAll}/byAuthor/${authorId}`);
  }

  getBooksByGenre(genre: string) {
    const url = `${this.baseUrlAll}/byGenre?genre=${genre}`;
    return this.http.get<Book[]>(url);
  }


  createBook(bookTitle: string, authorId: number) {
    const url = `${this.baseUrlAll}`;
    const bookData: BookData = { title: bookTitle, author: { id: authorId } };
    return this.http.post<Book[]>(url,bookData);
  }
}
