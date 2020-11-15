import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../providers/user.service';
import { User } from '../../../../models/user';
import { BooksService } from '../../../../providers/books.service';
import { Book } from '../../../../models/book';
import { SubscriptionBook } from '../../../../models/subscription-book';
import { SubscriptionService } from '../../../../providers/subscription.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private userService: UserService,
    private bookService: BooksService,
    private subscriptionService: SubscriptionService,) { }
  
  public user: User;
  public availableBooks: SubscriptionBook[];
  public subscribedBooks: SubscriptionBook[];

  public showSubscriptions = false;
  public showAvailable = false;

  ngOnInit(): void {
    this.user = this.userService.userValue;
    this.loadAvailableBooks(this.user.userName);
    this.loadSubscribedBooks(this.user.userName);
  }

  loadAvailableBooks(userName: string) {
    return this.subscriptionService.getAvailableBooks(userName).subscribe(e => {
      this.availableBooks = e.map(item => ({
        bookId: item.bookId,
        name: item.name,
        price: item.price,
        subscriptionId: item.subscriptionId,
        text: item.text,
        userName: item.userName
      } as SubscriptionBook));

      this.showAvailable = this.availableBooks.length > 0;
    });
  }

  loadSubscribedBooks(userName: string) {
    return this.subscriptionService.getSubscribedBooks(userName).subscribe(e => {
      this.subscribedBooks = e.map(item => ({
        bookId: item.bookId,
        name: item.name,
        price: item.price,
        subscriptionId: item.subscriptionId,
        text: item.text,
        userName: item.userName
      } as SubscriptionBook));

      this.showSubscriptions = this.subscribedBooks.length > 0;
    });
  }

  subscribeEvent(bookId: number) {
    return this.subscriptionService.createSubscription(this.user.userName, bookId).subscribe(
      () => {
        this.loadAvailableBooks(this.user.userName);
        this.loadSubscribedBooks(this.user.userName);
        Swal.fire("Good job!", "Thank you for subscribing", "success");
      }
    );
  }

  unSubscribeEvent(subscriptionId: number) {
    return this.subscriptionService.deleteSubscription(subscriptionId).subscribe(
      () => {
        this.loadAvailableBooks(this.user.userName);
        this.loadSubscribedBooks(this.user.userName);
        Swal.fire("You have unsubscribed", "We hope you've enjoyed the book", "success");
      }
    );
  }

  logoutFromHome() {
    this.userService.logout();
    location.reload();
  }
}
