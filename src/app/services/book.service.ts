import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { Author } from '../models/author.model';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'http://localhost:8080/v1/books';

  constructor(private http: HttpClient) {}

  getAvailableBooks(): Observable<Book[]> {
    const url = `${this.baseUrl}/available`;
    return this.http.get<Book[]>(url);
  }

  getUnavailableBooks(): Observable<Book[]> {
    const url = `${this.baseUrl}/unavailable`;
    return this.http.get<Book[]>(url);
  }

  getBooksByAuthor(authorId: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/byAuthor/${authorId}`);
  }

  getBooksByGenre(genre: string) {
    const apiUrl = `http://localhost:8080/v1/books/byGenre?genre=${genre}`;
    return this.http.get<Book[]>(apiUrl);
  }


}
