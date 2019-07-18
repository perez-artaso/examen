import { Component, OnInit } from '@angular/core';
import { SessionService } from './services/session.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Client } from './classes/client';
declare const $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  clientLogged: boolean;

  constructor(private sessionManager: SessionService, private router: Router, private jwt: JwtHelperService) {
    this.clientLogged = false;
    this.sessionManager.clientLoggedInAnnouncement$.subscribe(
      () => this.clientLogged = true
    );
    this.sessionManager.clientLoggedOutAnnouncement$.subscribe(
      () => this.clientLogged = false
    );
  }

  ngOnInit(){
    $(document).foundation();
    if (localStorage.getItem('TIST') !== null) {
      if (!this.jwt.isTokenExpired()) {
        
        this.sessionManager.ClientLoggedIn(
          new Client(
            this.jwt.decodeToken(localStorage.getItem('TIST')).id,
            this.jwt.decodeToken(localStorage.getItem('TIST')).name,
            this.jwt.decodeToken(localStorage.getItem('TIST')).mail
            )
          );
          this.router.navigate(['/invoicePanel']);
      }
    }
  }

  Logout() {
    localStorage.removeItem('TIST');
    this.sessionManager.ClientLoggedOut();
    this.router.navigate(['/clientsLanding']);
  }
  
  ChangePassword() {
    this.router.navigate(['/changePassword']);
  }

}
