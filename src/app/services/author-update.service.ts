import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorUpdateService {
  private authorCreatedSource = new Subject<void>();

  authorCreated$ = this.authorCreatedSource.asObservable();

  notifyAuthorCreated() {
    this.authorCreatedSource.next();
  }
}
