import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as MotionUI from '../../../assets/motion-ui/dist/motion-ui.min';
import { RequestingService } from 'src/app/services/requesting.service';
declare const $: any;

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  newSomethingForm: FormGroup;
  alertMessages: Array<string>;

  constructor(private fb: FormBuilder, private requester: RequestingService) {
    this.newSomethingForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      type: ['1']
    });
  }

  ngOnInit() {
  }

  // Si hay tiempo, validar date

  onSubmit() {
    this.alertMessages = new Array<string>();

    if (!this.newSomethingForm.valid) {

      if (this.newSomethingForm.controls['email'].hasError('required')) {
        this.alertMessages.push('- Email Requerido');
      }
      if (this.newSomethingForm.controls['email'].hasError('email')) {
        this.alertMessages.push('- Email Inválido');
      }
      if (this.newSomethingForm.controls['password'].hasError('required')) {
        this.alertMessages.push('- Contraseña Requerida');
      }
      if (this.newSomethingForm.controls['password'].hasError('minlength')) {
        this.alertMessages.push('- La contraseña debe superar los dos caracteres');
      }

      this.toggleAlert();
    } else {
      this.requester.createUser(
        this.newSomethingForm.controls['email'].value,
        this.newSomethingForm.controls['password'].value,
        this.newSomethingForm.controls['type'].value
      ).subscribe(
        (serverResponse: any) => {
          if (serverResponse.statusCode === 500) {
            this.alertMessages = new Array<string>('Ha Ocurrido Un Error');
            this.toggleAlert();
          } else if (serverResponse.statusCode === 200) {
            this.hideAlert();
            this.toggleSuccess();
            this.cleanFormFields();
            setTimeout(() => this.hideSuccess(), 2500);
          }
        }
      );

    }
  }

  toggleAlert() {
    MotionUI.animateIn($('#alertMessages'), 'scale-in-up');
  }

  hideAlert() {
    MotionUI.animateOut($('#alertMessages'), 'scale-out-down');
  }

  toggleSuccess() {
    MotionUI.animateIn($('#successMessages'), 'scale-in-up');
  }

  hideSuccess() {
    MotionUI.animateOut($('#successMessages'), 'scale-out-down');
  }


  cleanFormFields() {
    this.newSomethingForm.controls['email'].setValue('');
    this.newSomethingForm.controls['password'].setValue('');
    this.newSomethingForm.controls['type'].setValue('1');
  }

}
