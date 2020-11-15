import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(
    private http: HttpClient
  ) { }


  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.apiUrl}/book/`)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      )
  }


  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
