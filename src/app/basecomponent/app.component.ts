import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Welcome to the Library App</h1>
    <app-book-list></app-book-list>
    <app-rental-list></app-rental-list>

  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
