import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestingService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost/facultapp';
  }

  login(_email: string, _password: string) {
    return this.http.post(
      this.baseUrl + '/login',
      {
        mail: _email,
        password: _password
      }
    );
  }

}
