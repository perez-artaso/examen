import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class RequestingService {

  baseUrl: string;
  headers = new HttpHeaders({
    'clientId': this.sessionManager.GetClientsId().toString()
  });

  constructor(private http: HttpClient, private sessionManager: SessionService) { 
    this.baseUrl = 'https://localhost/invoicingServer';
  }

  /* Así No
  GetInvoice(invoiceId: number) {
    return this.http.get(this.baseUrl + '/getInvoice/'+ this.sessionManager.GetClientsId().toString() + '/'+ invoiceId, {
      headers: this.headers,
      responseType: 'text'
    });
  }
  */
 
  GetInvoiceList() {
    return this.http.post(this.baseUrl + '/getClientInvoices', {
      clientId: this.sessionManager.GetClientsId()
    });
  }
}