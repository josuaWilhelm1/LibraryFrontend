import { Component, OnInit } from '@angular/core';
import { Rental } from '../models/rental.model';
import { RentalService } from '../services/rental.service';

@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.css'],
})
export class RentalListComponent implements OnInit {
  rentals: Rental[] = [];
  overdueRentals: Rental[] = [];

  constructor(private rentalService: RentalService) {}

  ngOnInit() {
    this.getRentals();
    this.getOverdueRentals();
  }

  getRentals() {
    this.rentalService.getRentals().subscribe(
      (rentals: Rental[]) => {
        this.rentals = rentals;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getOverdueRentals() {
    this.rentalService.getOverdueRentals().subscribe(
      (rentals: Rental[]) => {
        this.overdueRentals = rentals;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  returnBook(rental: Rental) {
    this.rentalService.returnRental(rental.id).subscribe(
      () => {
        console.log('Book returned successfully');
        // Update the rental status in the component
        rental.returned = true;
      },
      (error) => {
        console.log('Failed to return book:', error);
      }
    );
  }
}
