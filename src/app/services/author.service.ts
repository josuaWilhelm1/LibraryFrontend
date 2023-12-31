import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Author} from '../models/author.model';
import {AuthorData} from "../models/authorData.model";

//AuthorService for HTTP requests
@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private apiUrlAll = 'http://localhost:8080/v1/authors';
  private apiUrlOne = 'http://localhost:8080/v1/author';

  constructor(private http: HttpClient) {
  }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.apiUrlAll);
  }

  createAuthor(authorName: string): Observable<any> {
    const authorData: AuthorData = {name: authorName};
    return this.http.post(this.apiUrlOne, authorData);
  }
}
