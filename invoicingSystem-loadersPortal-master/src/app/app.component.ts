import { Component, OnInit } from '@angular/core';
import { SessionService } from './services/session.service';
import { Loader } from './classes/loader';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loaderLogged: boolean;

  constructor (private sessionManager: SessionService, private router: Router, private jwt: JwtHelperService) {
    this.loaderLogged = false;
    this.sessionManager.loaderLoggedInAnnouncement$.subscribe(
      () => this.loaderLogged = true
    );
    this.sessionManager.loaderLoggedOutAnnouncement$.subscribe(
      () => this.loaderLogged = false
    );
  }


  ngOnInit() {
    if (localStorage.getItem('TIST') !== null) {
      if (!this.jwt.isTokenExpired()) {

        this.sessionManager.loaderLoggedIn(
          new Loader(
            this.jwt.decodeToken(localStorage.getItem('TIST')).id,
            this.jwt.decodeToken(localStorage.getItem('TIST')).name,
            this.jwt.decodeToken(localStorage.getItem('TIST')).mail
            )
          );
          this.router.navigate(['/loadersMenu/']);
      }
    }
  }

  Logout() {
    localStorage.removeItem('TIST');
    this.sessionManager.loaderLoggedOut();
    this.router.navigate(['/loadersLanding']);
  }

  ChangePassword() {
    this.router.navigate(['/loadersMenu/changePassword']);
  }

}