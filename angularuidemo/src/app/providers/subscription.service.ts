import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { SubscriptionBook } from '../models/subscription-book';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(
    private http: HttpClient
  ) { }

  getAvailableBooks(userName: string): Observable<SubscriptionBook[]> {
    return this.http.get<SubscriptionBook[]>(`${environment.apiUrl}/Subscription/availablebooks/${userName}`)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      )
  }

  getSubscribedBooks(userName: string): Observable<SubscriptionBook[]> {
    return this.http.get<SubscriptionBook[]>(`${environment.apiUrl}/Subscription/subscribedbooks/${userName}`)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      )
  }

  createSubscription(userName: string, bookId: number) {
    return this.http.post(`${environment.apiUrl}/Subscription/create`, { userName: userName, bookId: bookId });
  }

  deleteSubscription(subscriptionId: number) {
    return this.http.delete(`${environment.apiUrl}/Subscription/${subscriptionId}`);
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
