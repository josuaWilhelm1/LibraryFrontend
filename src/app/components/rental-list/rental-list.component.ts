import {Component, OnInit} from '@angular/core';
import {Rental} from '../../models/rental.model';
import {RentalService} from '../../services/rental.service';
import {RentalReturnService} from "../../services/rental-return.service";
import {RentalUpdateService} from "../../services/rental-update.service";

@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.css'],
})
export class RentalListComponent implements OnInit {
  ongoingRentals: Rental[] = [];
  returnedRentals: Rental[] = [];
  overdueRentals: Rental[] = [];
  overdueRentalsError:String="";
  ongoingRentalsError:String="";
  returnedRentalsError:String="";

  constructor(private rentalService: RentalService,
              private rentalReturnService: RentalReturnService,
              private rentalUpdateService: RentalUpdateService
  ) {
  }

  ngOnInit() {
    this.getOngoingRentals();
    this.getReturnedRentals();
    this.getOverdueRentals();
    this.rentalUpdateService.rentalCreated$.subscribe(() => {
      this.getOngoingRentals();
      this.getReturnedRentals();
      this.getOverdueRentals();
    })
    this.rentalReturnService.rentalReturn$.subscribe(() => {
      this.getOngoingRentals();
      this.getReturnedRentals();
      this.getOverdueRentals();
    })
  }

  getOngoingRentals() {
    this.rentalService.getOngoingRentals().subscribe(
      (rentals: Rental[]) => {
        this.ongoingRentals = rentals;
        if (rentals.length === 0) {
          this.ongoingRentalsError = 'No ongoing rentals found.';
        } else {
          this.ongoingRentalsError = '';
        }
      },
      (error) => {
        console.error(error);
        this.ongoingRentals = [];
        this.ongoingRentalsError = 'Error occurred while searching for rentals.';
      }
    );
  }

  getReturnedRentals() {
    this.rentalService.getReturnedRentals().subscribe(
      (rentals: Rental[]) => {
        this.returnedRentals = rentals;
        if (rentals.length === 0) {
          this.returnedRentalsError = 'No returned rentals found.';
        } else {
          this.returnedRentalsError = '';
        }
      },
      (error) => {
        console.error(error);
        this.returnedRentals = [];
        this.returnedRentalsError = 'Error occurred while searching for rentals.';
      }
    );
  }

  getOverdueRentals() {
    this.rentalService.getOverdueRentals().subscribe(
      (rentals: Rental[]) => {
        this.overdueRentals = rentals;
        if (rentals.length === 0) {
          this.overdueRentalsError = 'No overdue rentals found.';
        } else {
          this.ongoingRentalsError = '';
        }
      },
      (error) => {
        console.error(error);
        this.overdueRentals = [];
        this.ongoingRentalsError = 'Error occurred while searching for rentals.';
      }
    );
  }

  returnBook(rental: Rental) {
    this.rentalService.returnRental(rental.id).subscribe(
      () => {
        this.rentalReturnService.notifyRentalReturned();
      },
      (error) => {
        console.error('Failed to return book:', error);
      }
    );
  }
}
