import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import * as MotionUI from '../../assets/motion-ui/dist/motion-ui.min';
import { RequestingService } from '../requesting.service';

declare const $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessages: Array<string>;
  successMessages: Array<string>;
  buttonBlocked: boolean;

  constructor(private fb: FormBuilder, private requester: RequestingService) {
    this.loginForm = this.fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.required]
    });
    this.buttonBlocked = false;
  }

  ngOnInit() {

  }

  onSubmit() {
    if (!this.loginForm.valid) {

      this.errorMessages = new Array<string>();

      if (this.loginForm.controls['email'].hasError('required')) {
          this.errorMessages.push('Ingrese un email');
      }

      if (this.loginForm.controls['email'].hasError('email') && !this.loginForm.controls['email'].hasError('required')) {
        this.errorMessages.push('El formato del email ingresado no es válido');
      }

      if (this.loginForm.controls['password'].hasError('required')) {
        this.errorMessages.push('Ingrese una contraseña');
      }

      this.toggleAlert();
    } else {
      this.requester.login(
        this.loginForm.controls['email'].value,
        this.loginForm.controls['password'].value
      ).subscribe(
        (serverResponse: any) => {
          if (serverResponse.statusCode === 500) {
            this.errorMessages = new Array<string>('Contraseña Incorrecta');
            this.toggleAlert();
          } else if (serverResponse.statusCode === 404) {
            this.errorMessages = new Array<string>('Usuario Inexistente');
            this.toggleAlert();
          } else if (serverResponse.statusCode === 200) {
            this.successMessages = new Array<string> ('¡Bienvenido! Su token es: ' + serverResponse.message);
            this.toggleSuccess();
          }
        }
      );
    }
  }

  toggleAlert() {
    const element = $('#errorMessages');
    this.buttonBlocked = true;
    MotionUI.animateIn(element, 'scale-in-up');
    setTimeout(() => {
      const elem = $('#errorMessages');
      MotionUI.animateOut(elem, 'scale-out-down');
      this.buttonBlocked = false;
    }, 2200);
  }

  toggleSuccess() {
    const element = $('#successMessages');
    this.buttonBlocked = true;
    MotionUI.animateIn(element, 'scale-in-up');
    setTimeout(() => {
      const elem = $('#successMessages');
      MotionUI.animateOut(elem, 'scale-out-down');
      this.buttonBlocked = false;
    }, 2200);
  }

}
