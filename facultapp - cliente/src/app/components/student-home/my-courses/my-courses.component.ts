import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course';
import { SessionService } from 'src/app/services/session.service';
import { RequestingService } from 'src/app/services/requesting.service';
import { Inscription } from 'src/app/models/inscription';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {

  myCourses: Array<Course>;
  myInscriptions: Array<Inscription>;

  constructor(private session: SessionService, private requester: RequestingService) {
    this.myCourses = new Array<Course>();
    this.myInscriptions = new Array<Inscription>();
  }

  ngOnInit() {
    this.requester.readInscriptions().subscribe(
      (serverResponse: any) => {
        serverResponse.message.forEach((inscription: Inscription) => {
          if(inscription.student === this.session.currentUser.id) {
            this.myInscriptions.push(new Inscription(inscription.student, inscription.course));
          }
        });
      }
    );

    this.requester.readCourses().subscribe(
      (serverResponse: any) => {
        serverResponse.message.forEach(
          (course: Course) => {
            if (this.inscripted(this.myInscriptions, course)) {
              this.myCourses.push(new Course(course.id, course.name, course.quarter, course.room, course.teacher));
            }
          }
        );
      }
    );

  }

  inscripted(myInscriptions: Array<Inscription>, course: Course) {
    let booleanReturn = false;
    myInscriptions.forEach(
      (inscription: Inscription) => {
        if (inscription.course === course.id) {
          booleanReturn = true;
        }
      }
    );

    return booleanReturn;
  }

}
