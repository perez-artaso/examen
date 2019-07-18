import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as MotionUI from '../../../assets/motion-ui/dist/motion-ui.min';
import { User } from 'src/app/models/user';
import { RequestingService } from 'src/app/services/requesting.service';
declare const $: any;

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  newSomethingForm: FormGroup;
  alertMessages: Array<string>;
  teachers: Array<User>;
  newCourse: boolean;
  readCourses: boolean;
  readUsers: boolean;

  constructor(private fb: FormBuilder, private requester: RequestingService) {

    this.newCourse = true;
    this.readCourses = false;
    this.readUsers = false;

    setTimeout(() => {
      this.teachers = this.requester.users.filter((user: User) => user.type === 2);
      console.dir(this.teachers);
    }, 2500);

    this.newSomethingForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      quarter: [1, Validators.required],
      room: [0, Validators.required],
      teacher: [0, Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.alertMessages = new Array<string>();

    if (!this.newSomethingForm.valid) {

      if (this.newSomethingForm.controls['name'].hasError('required')) {
        this.alertMessages.push('- El Nombre Es Un Dato Obligatorio');
      }
      if (this.newSomethingForm.controls['name'].hasError('minlength')) {
        this.alertMessages.push('- La longitud del nombre debe superar los dos caracteres');
      }
      if (this.newSomethingForm.controls['quarter'].hasError('required')) {
        this.alertMessages.push('- El cuatrimestre es un dato requerido');
      }
      if (this.newSomethingForm.controls['room'].hasError('required')) {
        this.alertMessages.push('- El cupo es un dato requerido');
      }
      if (this.newSomethingForm.controls['teacher'].hasError('required')) {
        this.alertMessages.push('- El cuatrimestre es un dato requerido');
      }
      this.toggleAlert();
    } else {
      this.requester.createCoruse(
        this.newSomethingForm.controls['name'].value,
        this.newSomethingForm.controls['quarter'].value,
        this.newSomethingForm.controls['room'].value,
        this.newSomethingForm.controls['teacher'].value
      ).subscribe(
        (serverResponse: any) => {
          if (serverResponse.statusCode === 200) {
            this.hideAlert();
            this.toggleSuccess();
            this.cleanFormFields();
            setTimeout(() => this.hideSuccess(), 2500);
          } else {
            this.alertMessages.push('- Ocurrió un error');
            this.toggleAlert();
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

  passwordConfirmed(password: string, confirmation: string) {
    if (password === confirmation) {
      return true;
    } else {
        return false;
    }
  }

  cleanFormFields() {
    this.newSomethingForm.controls['name'].setValue('');
    this.newSomethingForm.controls['quarter'].setValue(1);
    this.newSomethingForm.controls['room'].setValue(0);
    this.newSomethingForm.controls['teacher'].setValue('');
  }

  newCourseSelected() {
    this.newCourse = true;
    this.readCourses = false;
    this.readUsers = false;
  }

  readCoursesSelected() {
    this.newCourse = false;
    this.readCourses = true;
    this.readUsers = false;
  }

  readUsersSelected() {
    this.newCourse = false;
    this.readCourses = false;
    this.readUsers = true;
  }

}