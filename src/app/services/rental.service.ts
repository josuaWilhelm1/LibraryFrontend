import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Rental} from '../models/rental.model';
import {Book} from "../models/book.model";
import {RentalData} from "../models/rentalData.model";

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private baseUrlOne = 'http://localhost:8080/v1/rental';
  private baseUrlAll = 'http://localhost:8080/v1/rentals';


  constructor(private http: HttpClient) {
  }


  getOverdueRentals(): Observable<Rental[]> {
    const url = `${this.baseUrlAll}/overdue`;
    let result = this.http.get<Rental[]>(url);
    return result;
  }

  getOngoingRentals(): Observable<Rental[]> {
    const url = `${this.baseUrlAll}/ongoing`;
    return this.http.get<Rental[]>(url);
  }


  getReturnedRentals(): Observable<Rental[]> {
    const url = `${this.baseUrlAll}/returned`;
    let result = this.http.get<Rental[]>(url);
    return result;
  }

  rentBook(book: Book): Observable<Rental> {
    const url = this.baseUrlOne;
    const rentalData: RentalData = {book: {id: book.id}};
    let result = this.http.post<Rental>(url, rentalData);
    return result;

  }

  returnRental(rentalId: number): Observable<any> {
    const url = `${this.baseUrlOne}/${rentalId}`;
    let result = this.http.patch(url, {});
    return result;

  }
}
