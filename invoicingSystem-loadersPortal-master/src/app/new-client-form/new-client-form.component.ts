import { Component, OnInit } from '@angular/core';
import * as MotionUI from '../../assets/motion-ui/dist/motion-ui.min';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RequestingService } from '../services/requesting.service';
import { ServerResponse } from '../classes/server-response';

declare const $: any;

@Component({
  selector: 'app-new-client-form',
  templateUrl: './new-client-form.component.html',
  styleUrls: ['./new-client-form.component.css']
})
export class NewClientFormComponent implements OnInit {

  validationMessage: string;
  newClientForm: FormGroup;
  buttonBlocked: boolean;
  
  constructor(private fb: FormBuilder, private requester: RequestingService) {
    this.buttonBlocked = false;
    this.newClientForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      mail: ['', Validators.compose([Validators.required, this.invalidMail])],      
      extraIds: ['']
    });
  }

  ngOnInit() {
    $(document).foundation();
  }

  onSubmit() {
    this.validationMessage = "";

    if (!this.newClientForm.valid) {
      let errorMessage = "";

      if(this.newClientForm.controls["id"].hasError("required")) {
        errorMessage += "Ingrese el ID del Cliente. ";
      }
      if(this.newClientForm.controls["mail"].hasError("required")) {
        errorMessage += "Ingrese el mail del Cliente. ";
      }
      if(this.newClientForm.controls["name"].hasError("required")) {
        errorMessage += "Ingrese el nombre del Cliente. ";
      }
      if(this.newClientForm.controls["mail"].hasError("invalidMail")) {
        errorMessage = "El mail ingresado no es válido. ";
      }
      if(this.newClientForm.controls["mail"].hasError("required") && this.newClientForm.controls["name"].hasError("required") && this.newClientForm.controls["id"].hasError("required")) {
        errorMessage = "El ID, mail y nombre del Cliente son datos necesarios para el alta de los mismos.";
      }

      this.onInvalidField(errorMessage);
    } else {
      this.requester.CreateClient(
        this.newClientForm.controls["id"].value, 
        this.newClientForm.controls["name"].value, 
        this.newClientForm.controls["mail"].value, 
        this.newClientForm.controls["extraIds"].value
      ).subscribe(
        (serverResponse: ServerResponse) => {
          if (serverResponse.statusCode === 200) {
            this.toggleSuccessMessage();
            this.clearFormFields();
          } else if ( serverResponse.statusCode === 400 ) {
            this.onInvalidField("El ID ingresado ya figura en la base de datos. Por favor, revíselo.");
          } else {
            this.onInvalidField("Ocurrió un error en la carga. Intente loguearse nuevamente.");
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
    const element = $("#userErrorFeedback");
    this.buttonBlocked = true;
    MotionUI.animateIn(element, "scale-in-up");
    setTimeout(() => {
      const element = $("#userErrorFeedback");
      MotionUI.animateOut(element, "scale-out-down");
      this.buttonBlocked = false;
    }, 1500);
  }

  toggleSuccessMessage() {
    const element = $("#userSuccessFeedback");
    MotionUI.animateIn(element, "scale-in-up");
    setTimeout(() => {
      const element = $("#userSuccessFeedback");
      MotionUI.animateOut(element, "scale-out-down");
    }, 1300);
  }

  clearFormFields() {
    this.newClientForm.controls['id'].setValue("");
    this.newClientForm.controls['name'].setValue("");
    this.newClientForm.controls['mail'].setValue("");
    this.newClientForm.controls['extraIds'].setValue("");
  }

  invalidMail(control: FormControl): { [errorCode: string]: boolean } {
    if(control.value != "" && !control.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      return {invalidMail: true}
    }
  }

}