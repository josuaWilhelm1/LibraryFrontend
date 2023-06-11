import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentalUpdateService {
  private rentalCreatedSource = new Subject<void>();

  rentalCreated$ = this.rentalCreatedSource.asObservable();

  notifyRentalCreated() {
    this.rentalCreatedSource.next();
  }
}
