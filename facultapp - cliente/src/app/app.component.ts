import { Component, AfterViewInit, OnInit } from '@angular/core';
import { SessionService } from './services/session.service';
import { RequestingService } from './services/requesting.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { User } from './models/user';

declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {

  activeSession: boolean;

  constructor(private router: Router, private session: SessionService, private requester: RequestingService, private jwt: JwtHelperService) {
    this.activeSession = false;
    this.session.loggedInObservable.subscribe(
      () => this.activeSession = true
    );
    this.session.loggedOutObservable.subscribe(
      () => this.activeSession = false
    );
  }

  ngOnInit () {
    if (localStorage.getItem('SPToken') !== null) {
      if (!this.jwt.isTokenExpired(localStorage.getItem('SPToken'))) {
        const decodedToken = this.jwt.decodeToken(localStorage.getItem('SPToken'));
        this.session.onLoggedIn(new User(decodedToken.id, decodedToken.mail, decodedToken.type));
        this.router.navigate(['/home']);
      }
    }
  }

  ngAfterViewInit() {
  }

  logOut() {
    this.session.logOut();
  }

}
