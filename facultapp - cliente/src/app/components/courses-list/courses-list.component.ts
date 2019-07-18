import { Component, OnInit } from '@angular/core';
import { RequestingService } from 'src/app/services/requesting.service';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  courses: Array<Course>;

  constructor(private requester: RequestingService) {
    this.courses = new Array<Course>();
  }

  ngOnInit() {
    this.requester.readCourses().subscribe(
      (serverResponse: any) => {
        if (serverResponse.statusCode === 200) {
          this.courses = serverResponse.message;
        }
      }
    );
  }

}
