import { Injectable } from '@angular/core';
import { Client } from '../classes/client';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private baseUrl: string;
  private currentClient: Client;

  // Sección de anuncios: usuario logueado ------------------------------------------------------

  // Fuente desde la que leer la información de quien se logueó
  clientLoggedInSignal = new Subject<Client>();
  // Objeto obeservable (puede leerse desde cualquier punto de la app vía suscripción)
  clientLoggedInAnnouncement$ = this.clientLoggedInSignal.asObservable();
  
  clientLoggedOutSignal = new Subject<void>();
  clientLoggedOutAnnouncement$ = this.clientLoggedOutSignal.asObservable();

  ClientLoggedIn(Client: Client) {
    this.currentClient = Client;
    this.clientLoggedInSignal.next(Client);
  }

  ClientLoggedOut() {
    this.currentClient = null;
    this.clientLoggedOutSignal.next();
  }

  // --------------------------------------------------------------------------------------------
  constructor(private http: HttpClient, private jwt: JwtHelperService) {
    this.baseUrl = 'https://localhost/invoicingServer';
  }

  ActiveSession(): boolean {
    if (this.currentClient !== undefined) return true; 
    else return false;
  }

  GetClientsId () {
    if (this.currentClient !== undefined) {
      return this.currentClient.id;
    } else {
      return undefined;
    }    
  }

  GetClientsName () {
    if (this.currentClient !== undefined) {
      return this.currentClient.name;
    } else {
      return undefined;
    }
  }

  GetClientsMail () {
    if (this.currentClient !== undefined) {
      return this.currentClient.mail;
    } else {
      return undefined;
    }
  }

  ClientLogin(mail: string, password: string) {
    return this.http.post(this.baseUrl + '/clientLogin', {
      mail: mail,
      password: password
    });
  }

  ChangePassword(mail: string, password: string, newPassword: string) {
    return this.http.post(this.baseUrl + '/changeClientsPassword', {
      mail: mail, 
      password: password,
      newPassword: newPassword
    });
  }

  PasswordRecovery (mail: string) {
    return this.http.post(this.baseUrl + '/clientPasswordRecovery', {
      mail: mail
    });
  }

}
