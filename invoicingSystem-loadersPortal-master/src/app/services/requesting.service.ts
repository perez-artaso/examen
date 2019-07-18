import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class RequestingService {

  baseUrl: string;
  httpClientOptions = {
    headers: new HttpHeaders({
      'loaderId': this.sessionManager.GetLoadersId().toString()
    })
  };

  constructor(private http: HttpClient, private sessionManager: SessionService) {
    this.baseUrl = 'https://localhost/invoicingServer';
  }

  CreateClient (id: number, name: string, mail: string, extraIds = null) {
    return this.http.post(this.baseUrl + '/createClient', {
      id: id,
      name: name,
      mail: mail, 
      extraIds: extraIds
    },
      this.httpClientOptions
    );
  }

  DeleteClient (id: number) {
    return this.http.post(this.baseUrl + '/deleteClient', {
      id: id
    },
      this.httpClientOptions
    );
  }

  ReadClients () {
    return this.http.get(this.baseUrl + '/readClients');
  }
}