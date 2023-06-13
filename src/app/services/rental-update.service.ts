import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentalUpdateService {
  private rentalCreatedSource = new Subject<void>();
  private rentalReturnedSource = new Subject<void>();


  rentalCreated$ = this.rentalCreatedSource.asObservable();
  rentalReturned$ = this.rentalReturnedSource.asObservable();


  notifyRentalCreated() {
    this.rentalCreatedSource.next();
  }
  notifyRentalReturned() {
    this.rentalReturnedSource.next();
  }
}
