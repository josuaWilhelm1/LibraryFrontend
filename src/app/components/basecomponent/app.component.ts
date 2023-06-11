import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Welcome to the Library App</h1>
    <div class="container">
      <div class="left-panel">
        <app-book-list></app-book-list>
      </div>
      <div class="right-panel">
        <app-rental-list></app-rental-list>
      </div>
    </div>
    <div class="container">
      <app-creation></app-creation>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
