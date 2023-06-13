import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

//BookUpdateService for notifying Components about book creation
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
