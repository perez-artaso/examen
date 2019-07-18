import { Component, OnInit } from '@angular/core';
import * as MotionUI from '../../assets/motion-ui/dist/motion-ui.min';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SessionService } from '../services/session.service';
import { ServerResponse } from '../classes/server-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-pass-form',
  templateUrl: './change-pass-form.component.html',
  styleUrls: ['./change-pass-form.component.css']
})
export class ChangePassFormComponent implements OnInit {

  changePassForm: FormGroup;
  buttonBlocked: boolean;
  validationMessage: string;
  passwordSuccessfullyChanged: boolean;

  constructor(private fb: FormBuilder, private sessionManager: SessionService, private router: Router) {
    this.buttonBlocked = false;
    this.passwordSuccessfullyChanged = false;
    this.changePassForm = this.fb.group({
      password: ['', Validators.required],
      newPassword: ['', Validators.required],
      newPasswordRepetition: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit() {

    this.validationMessage = "";

    if(!this.changePassForm.valid || !this.sessionManager.ActiveSession()) {
      let errorMessage = "";

      if(this.wrongPasswordConfirmation()) {
        errorMessage = "La nueva clave introducida no coincide con la clave de confirmación ingresada"
      }

      if (this.changePassForm.controls['password'].hasError('required')) {
        errorMessage = "Ingrese su contraseña";
      }

      if (this.changePassForm.controls['newPassword'].hasError('required')) {
        errorMessage = "Ingrese su nueva contraseña";
      }

      if (this.changePassForm.controls['newPasswordRepetition'].hasError('required')) {
        errorMessage = "Repita su nueva contraseña";
      }

      if (this.changePassForm.controls['password'].hasError('required') && this.changePassForm.controls['newPassword'].hasError('required') && this.changePassForm.controls['newPasswordRepetition'].hasError('required')) {
        errorMessage = "Complete el formulario";
      }

      if (this.sessionManager.GetLoadersMail() === null || this.sessionManager.GetLoadersMail() === undefined || this.sessionManager.GetLoadersMail() === "") {
        errorMessage = "Parece que usted no está logueado, por favor: inice sesión";
      }

      this.onInvalidField(errorMessage);
    } else {
      this.sessionManager.ChangePassword(this.sessionManager.GetLoadersMail(), this.changePassForm.controls["password"].value, this.changePassForm.controls["newPassword"].value)
      .subscribe(
        (serverResponse: ServerResponse) => {
          if (serverResponse.statusCode === 200) {
            this.passwordSuccessfullyChanged = true;
            MotionUI.animateIn($("#succesMessage"), 'scale-in-up');
            setTimeout(() => this.router.navigate(['/loadersMenu/newClientForm']), 2500);
          } else if (serverResponse.statusCode === 403) {
            this.onInvalidField("Contraseña Incorrecta");
          } else if (serverResponse.statusCode === 404) {
            this.onInvalidField("Usuario Inexistente");
          } else if (serverResponse.statusCode === 400) {
            this.onInvalidField("Error, Comuníquese Con Sistemas");
          }
        }
      );
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

  wrongPasswordConfirmation(): boolean {
    if(this.changePassForm.controls["newPassword"].value != this.changePassForm.controls["newPasswordRepetition"].value) {
      return true;
    }

    return false;
  }

}
