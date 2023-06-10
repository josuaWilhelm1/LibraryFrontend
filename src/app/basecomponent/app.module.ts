import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BookListComponent } from '../book-list/book-list.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from "@angular/forms";
import {RentalListComponent} from "../rental-list/rental-list.component";


@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    RentalListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
