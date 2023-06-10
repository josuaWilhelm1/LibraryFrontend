import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rental } from '../models/rental.model';
import {Book} from "../models/book.model";


@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private baseUrl = 'http://localhost:8080/v1/rentals';

  constructor(private http: HttpClient) {}

  getRentals(): Observable<Rental[]> {
    const url = `${this.baseUrl}`;
    return this.http.get<Rental[]>(url);
  }

  getOverdueRentals(): Observable<Rental[]> {
    const url = `${this.baseUrl}/overdue`;
    return this.http.get<Rental[]>(url);
  }


  rentBook(book: Book): Observable<Rental> {
    const url = this.baseUrl;
    const rentalData = { book: { id: book.id } };
    return this.http.post<Rental>(url, rentalData);
  }
}
