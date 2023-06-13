import {Component, OnInit} from '@angular/core';
import {Rental} from '../../models/rental.model';
import {RentalService} from '../../services/rental.service';
import {RentalUpdateService} from "../../services/rental-update.service";

//Displays ongoing returned and overdue rentals
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
              private rentalUpdateService: RentalUpdateService
  ) {
  }

  ngOnInit() {
    this.getOngoingRentals();
    this.getReturnedRentals();
    this.getOverdueRentals();
    //update rentals on rental creation
    this.rentalUpdateService.rentalCreated$.subscribe(() => {
      this.getOngoingRentals();
      this.getReturnedRentals();
      this.getOverdueRentals();
    })
    //update rentals on rental update
    this.rentalUpdateService.rentalReturned$.subscribe(() => {
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
        this.rentalUpdateService.notifyRentalReturned();
      },
      (error) => {
        console.error('Failed to return book:', error);
      }
    );
  }
}
