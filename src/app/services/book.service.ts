import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book} from '../models/book.model';
import {BookData} from "../models/bookData.model";

//BookService for HTTP requests
@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrlAll = 'http://localhost:8080/v1/books';
  private baseUrlOne = 'http://localhost:8080/v1/book';

  constructor(private http: HttpClient) {
  }

  getAvailableBooks(): Observable<any> {
    const url = `${this.baseUrlAll}/available`;
    return this.http.get<Book[]>(url);
  }

  getUnavailableBooks(): Observable<any> {
    const url = `${this.baseUrlAll}/unavailable`;
    return this.http.get<Book[]>(url);
  }

  getBooksByAuthor(authorId: number): Observable<any> {
    const url = `${this.baseUrlAll}/byAuthor/${authorId}`;
    return this.http.get<Book[]>(url);
  }

  getBooksByGenre(genre: string): Observable<any> {
    const url = `${this.baseUrlAll}/byGenre?genre=${genre}`;
    return this.http.get<Book[]>(url);
  }

  createBook(bookTitle: string, authorId: number, bookGenre: string): Observable<any> {
    const bookData: BookData = {
      title: bookTitle,
      author: {id: authorId},
      genre: bookGenre
    };
    let result = this.http.post(this.baseUrlOne, bookData);
    return result;
  }
}
