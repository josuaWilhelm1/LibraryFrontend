import {Component} from '@angular/core';
import {MatDialogRef, MatDialog} from '@angular/material/dialog';
import {AuthorDialogComponent} from '../author-dialog/author-dialog.component';
import {BookDialogComponent} from "../book-dialog/book-dialog.component";

// import { BookDialogComponent } from '../bookDialog/bookDialog.component';


@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.css']
})
export class CreationComponent {
  constructor(public dialog: MatDialog) {
  }

  openAuthorDialog(): void {
    const dialogRef = this.dialog.open(AuthorDialogComponent, {
      width: '300px'
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openBookDialog(): void {
    const dialogRef = this.dialog.open(BookDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}