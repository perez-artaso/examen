import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  subject = new Subject();
  toObserve = this.subject.asObservable();
  userName: string;

  constructor() {
    
  }

  onLogin(userName: string) {
    this.userName = userName;
    this.subject.next();
  }




}
