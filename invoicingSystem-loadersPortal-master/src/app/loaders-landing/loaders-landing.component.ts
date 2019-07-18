import { Component, OnInit } from '@angular/core';
import * as MotionUI from '../../assets/motion-ui/dist/motion-ui.min';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SessionService } from '../services/session.service';
import { ServerResponse } from '../classes/server-response';
import { Loader } from '../classes/loader';
import { Router } from '@angular/router';
declare const $: any;

@Component({
  selector: 'app-loaders-landing',
  templateUrl: './loaders-landing.component.html',
  styleUrls: ['./loaders-landing.component.css']
})
export class LoadersLandingComponent implements OnInit {
  validationMessage: string;
  loadersLoginForm: FormGroup;
  buttonBlocked: boolean;

  constructor(private fb: FormBuilder, private sessionManager: SessionService, private jwt: JwtHelperService, private router: Router) {
    this.buttonBlocked = false;
    this.loadersLoginForm = this.fb.group({
      mail: ['', Validators.compose([Validators.required, this.invalidMail])],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    $(document).foundation();
  }

  onSubmit() {

    this.validationMessage = "";

    if(!this.loadersLoginForm.valid) {
      let errorMessage = "";
      
      if (this.loadersLoginForm.controls['mail'].hasError('required')) {
        errorMessage += "Ingrese su mail";
      }

      if (this.loadersLoginForm.controls['password'].hasError('required')) {
        errorMessage += "Ingrese su contraseña";
      }

      if (this.loadersLoginForm.controls['mail'].hasError('required') && this.loadersLoginForm.controls['password'].hasError('required')) {
        errorMessage = "Complete el formulario"
      }

      if (this.loadersLoginForm.controls['mail'].hasError('invalidMail')) {
        errorMessage += "Ingrese un email válido ";
      }

      this.onInvalidField(errorMessage);
    } else {
      this.sessionManager.LoaderLogin(
        this.loadersLoginForm.controls['mail'].value, 
        this.loadersLoginForm.controls['password'].value
        ).subscribe((serverResponse: ServerResponse) => {
          if (serverResponse.statusCode === 200) {
            localStorage.setItem('TIST', serverResponse.message);
            const decodedToken = this.jwt.decodeToken(serverResponse.message);
            this.sessionManager.loaderLoggedIn(new Loader (decodedToken.id, decodedToken.name, this.loadersLoginForm.controls['mail'].value));
            this.router.navigate(['/loadersMenu/newClientForm']);
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