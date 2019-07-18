import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  currentUser: User;
  loggedInSubject = new Subject();
  loggedInObservable = this.loggedInSubject.asObservable();
  loggedOutSubject = new Subject();
  loggedOutObservable = this.loggedOutSubject.asObservable();

  constructor(private router: Router) { }

  onLoggedIn(user: User) {
    this.currentUser = user;
    this.userLoggedIn(this.currentUser.email);
  }

  getUserEmail() {
    return this.currentUser.email;
  }

  getUserType() {
    return this.currentUser.type;
  }

  userLoggedIn(email: string) {
    this.loggedInSubject.next(email);
  }

  userLoggedOut () {
    this.loggedOutSubject.next();
  }

  logOut() {
    localStorage.removeItem('SPToken');
    this.userLoggedOut();
    this.router.navigate(['/login']);
  }

}
