import { Injectable } from '@angular/core';
import { Loader } from '../classes/loader';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private baseUrl: string;
  private currentLoader: Loader;

  // Sección de anuncios: usuario logueado ------------------------------------------------------

  // Fuente desde la que leer la información de quien se logueó
  loaderLoggedInSignal = new Subject<Loader>();
  // Objeto obeservable (puede leerse desde cualquier punto de la app vía suscripción)
  loaderLoggedInAnnouncement$ = this.loaderLoggedInSignal.asObservable();
  
  loaderLoggedOutSignal = new Subject<void>();
  loaderLoggedOutAnnouncement$ = this.loaderLoggedOutSignal.asObservable();

  loaderLoggedIn(loader: Loader) {
    this.currentLoader = loader;
    this.loaderLoggedInSignal.next(loader);
  }

  loaderLoggedOut() {
    this.currentLoader = null;
    this.loaderLoggedOutSignal.next();
  }

  // --------------------------------------------------------------------------------------------

  constructor(private http: HttpClient, private jwt: JwtHelperService) {
    this.baseUrl = 'https://localhost/invoicingServer';
  }

  ActiveSession(): boolean {
    if (this.currentLoader !== undefined) return true; 
    else return false;
  }

  GetLoadersId () {
    if (this.currentLoader !== undefined) {
      return this.currentLoader.id;
    } else {
      return undefined;
    }    
  }

  GetLoadersName () {
    if (this.currentLoader !== undefined) {
      return this.currentLoader.name;
    } else {
      return undefined;
    }
  }

  GetLoadersMail () {
    if (this.currentLoader !== undefined) {
      return this.currentLoader.mail;
    } else {
      return undefined;
    }
  }

  LoaderLogin(mail: string, password: string) {
    return this.http.post(this.baseUrl + '/loaderLogin', {
      mail: mail,
      password: password
    });
  }

  ChangePassword(mail: string, password: string, newPassword: string) {
    return this.http.post(this.baseUrl + '/changePassword', {
      mail: mail, 
      password: password,
      newPassword: newPassword
    });
  }

  PasswordRecovery (mail: string) {
    return this.http.post(this.baseUrl + '/passwordRecovery', {
      mail: mail
    });
  }
  
}
