import { Component, OnInit } from '@angular/core';
import * as MotionUI from '../../assets/motion-ui/dist/motion-ui.min';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SessionService } from '../services/session.service';
import { ServerResponse } from '../classes/server-response';
import { Router } from '@angular/router';
import { Client } from '../classes/client';

@Component({
  selector: 'app-clients-landing',
  templateUrl: './clients-landing.component.html',
  styleUrls: ['./clients-landing.component.css']
})
export class ClientsLandingComponent implements OnInit {
  validationMessage: string;
  clientsLoginForm: FormGroup;
  buttonBlocked: boolean;

  constructor(private sessionManager: SessionService, private fb: FormBuilder, private router: Router, private jwt: JwtHelperService) { 
    this.clientsLoginForm = this.fb.group({
      mail: ['', Validators.compose([Validators.required, this.invalidMail])],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    
  }

  onSubmit() {

    this.validationMessage = "";

    if(!this.clientsLoginForm.valid) {
      let errorMessage = "";
      
      if (this.clientsLoginForm.controls['mail'].hasError('required')) {
        errorMessage += "Ingrese su mail";
      }

      if (this.clientsLoginForm.controls['password'].hasError('required')) {
        errorMessage += "Ingrese su contraseña";
      }

      if (this.clientsLoginForm.controls['mail'].hasError('required') && this.clientsLoginForm.controls['password'].hasError('required')) {
        errorMessage = "Complete el formulario"
      }

      if (this.clientsLoginForm.controls['mail'].hasError('invalidMail')) {
        errorMessage = "Ingrese un email válido ";
      }

      this.onInvalidField(errorMessage);
    } else {
      this.sessionManager.ClientLogin(
        this.clientsLoginForm.controls['mail'].value, 
        this.clientsLoginForm.controls['password'].value
      ).subscribe(
        (serverResponse: ServerResponse) => {
          if (serverResponse.statusCode === 200) {
            localStorage.setItem('TIST', serverResponse.message);
            const decodedToken = this.jwt.decodeToken(serverResponse.message);
            this.sessionManager.ClientLoggedIn(new Client (decodedToken.id, decodedToken.name, this.clientsLoginForm.controls['mail'].value));
            this.router.navigate(['/invoicePanel']);
          } else if (serverResponse.statusCode === 404) {
            this.onInvalidField("Usuario Inexistente. Comuniquese con Sistemas para pedir el alta o consultar su situación");
          } else if (serverResponse.statusCode === 401) {
            this.onInvalidField("Contraseña Incorrecta");
          }
      });
    }

  }

  onInvalidField(messageToDisplay: string) {
    this.validationMessage = messageToDisplay;
    this.toggleAlert();
  }

  toggleAlert() {
    const element = $("#userFeedback");
    this.buttonBlocked = true;
    MotionUI.animateIn(element, "scale-in-up");
    setTimeout(() => {
      const element = $("#userFeedback");
      MotionUI.animateOut(element, "scale-out-down");
      this.buttonBlocked = false;
    }, 2200);
  }

  invalidMail(control: FormControl): { [errorCode: string]: boolean } {
    if(control.value != "" && !control.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      return {invalidMail: true}
    }
  }

}
