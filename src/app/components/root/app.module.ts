import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar'; // Add MatSnackBarModule

import {AppComponent} from './app.component';
import {BookListComponent} from '../book-list/book-list.component';
import {RentalListComponent} from '../rental-list/rental-list.component';
import {CreationComponent} from '../creation/creation.component';
import {AuthorDialogComponent} from '../author-dialog/author-dialog.component';
import {BookDialogComponent} from '../book-dialog/book-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    RentalListComponent,
    CreationComponent,
    AuthorDialogComponent,
    BookDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    MatSnackBarModule, // Add MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
