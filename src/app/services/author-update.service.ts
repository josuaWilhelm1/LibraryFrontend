import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

//AuthorUpdateService for notifying Components about author creation
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
