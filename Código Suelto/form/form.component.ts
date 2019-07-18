import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as MotionUI from '../../../assets/motion-ui/dist/motion-ui.min';
declare const $: any;

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  newSomethingForm: FormGroup;
  alertMessages: Array<string>;

  constructor(private fb: FormBuilder) {
    this.newSomethingForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      age: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(110)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      confirmPassword: ['', Validators.required],
      type: ['1'],
      date: ['1992-08-31'],
      checkbox1: [false],
      checkbox2: [true]
    });
  }

  ngOnInit() {
  }

  // Si hay tiempo, validar date

  onSubmit() {
    this.alertMessages = new Array<string>();

    if (!this.newSomethingForm.valid || !this.passwordConfirmed(this.newSomethingForm.controls['password'].value, this.newSomethingForm.controls['confirmPassword'].value)) {

      if (this.newSomethingForm.controls['name'].hasError('required')) {
        this.alertMessages.push('- El Nombre Es Un Dato Obligatorio');
      }
      if (this.newSomethingForm.controls['name'].hasError('minlength')) {
        this.alertMessages.push('- La longitud del nombre debe superar los dos caracteres');
      }
      if (this.newSomethingForm.controls['email'].hasError('required')) {
        this.alertMessages.push('- Email Requerido');
      }
      if (this.newSomethingForm.controls['email'].hasError('email')) {
        this.alertMessages.push('- Email Inválido');
      }
      if (this.newSomethingForm.controls['age'].hasError('required')) {
        this.alertMessages.push('- Edad Requerida');
      }
      if (this.newSomethingForm.controls['age'].hasError('min')) {
        this.alertMessages.push('- Edad Inválida');
      }
      if (this.newSomethingForm.controls['age'].hasError('max')) {
        this.alertMessages.push('- El máximo a ingresar es 110. Si usted los supera, felicidades: indique 110.');
      }
      if (this.newSomethingForm.controls['password'].hasError('required')) {
        this.alertMessages.push('- Contraseña Requerida');
      }
      if (this.newSomethingForm.controls['password'].hasError('minlength')) {
        this.alertMessages.push('- La contraseña debe superar los dos caracteres');
      }
      if (!this.passwordConfirmed(this.newSomethingForm.controls['password'].value, this.newSomethingForm.controls['confirmPassword'].value)) {
        this.alertMessages.push('- Las claves ingresadas no coinciden');
      }

      this.toggleAlert();
    } else {
      // HACER PETICION, SUSCRIBIRSE Y MOSTRAR MENSAJE.
      this.hideAlert();
      this.toggleSuccess();
      this.cleanFormFields();
      setTimeout(() => this.hideSuccess(), 2500);
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

  passwordConfirmed(password: string, confirmation: string) {
    if (password === confirmation) {
      return true;
    } else {
        return false;
    }
  }

  cleanFormFields() {
    this.newSomethingForm.controls['name'].setValue('');
    this.newSomethingForm.controls['email'].setValue('');
    this.newSomethingForm.controls['age'].setValue('');
    this.newSomethingForm.controls['password'].setValue('');
    this.newSomethingForm.controls['confirmPassword'].setValue('');
    this.newSomethingForm.controls['type'].setValue('1');
    this.newSomethingForm.controls['date'].setValue('');
    this.newSomethingForm.controls['checkbox1'].setValue(false);
    this.newSomethingForm.controls['checkbox2'].setValue(false);
  }

}
