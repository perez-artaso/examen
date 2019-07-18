import { Component, OnInit } from '@angular/core';
import { RequestingService } from 'src/app/services/requesting.service';
import { Course } from 'src/app/models/course';
import { Inscription } from 'src/app/models/inscription';
import { SessionService } from 'src/app/services/session.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  courses: Array<Course>;
  myInscriptions: Array<Inscription>;
  inscriptionForm: FormGroup;


  constructor(private requester: RequestingService, private session: SessionService, private fb: FormBuilder) { 
    this.inscriptionForm = this.fb.group({
      course: ['0']
    });
  }

  ngOnInit() {
    this.myInscriptions = this.requester.inscriptions.filter(
      (inscription: Inscription) => inscription.student == this.session.currentUser.id
    );
    this.courses = this.requester.courses.filter(
      (course: Course) => course.room !== '0' && !this.alreadyInscripted(this.myInscriptions, course)
    );
  }

  alreadyInscripted(inscriptions: Array<Inscription>, course: Course) {
    inscriptions.forEach((inscription: Inscription) => {
      if (inscription.course == course.id) {
        return true;
      }
    });
    return false;
  }

  onSubmit() {
    this.requester.createInscription(this.session.currentUser.id, this.inscriptionForm.controls['course'].value).subscribe(
      (serverResponse: any) => {
        if( serverResponse.statusCode === 200) {
          alert("todo en orden");
        } else {
          alert ("todo mal");
        }
      }
    );
  }

}
