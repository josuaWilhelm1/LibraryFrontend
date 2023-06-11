import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookUpdateService {
  private bookCreatedSource = new Subject<void>();

  bookCreated$ = this.bookCreatedSource.asObservable();

  notifyBookCreated() {
    this.bookCreatedSource.next();
  }
}
