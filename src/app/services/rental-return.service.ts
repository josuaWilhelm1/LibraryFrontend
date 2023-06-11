import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentalReturnService {
  private rentalReturnSource = new Subject<void>();

  rentalReturn$ = this.rentalReturnSource.asObservable();

  notifyRentalReturned() {
    this.rentalReturnSource.next();
  }
}
