import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inscription } from '../models/inscription';
import { User } from '../models/user';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class RequestingService {

  baseUrl = 'http://localhost/facultapp';
  inscriptions: Array<Inscription>;
  users: Array<User>;
  courses: Array<Course>;

  constructor(private http: HttpClient) {
    this.readUsers().subscribe(
      (serverResponse: any) => {
        if (serverResponse.statusCode === 200) {
          this.users = new Array<User>();
          serverResponse.message.forEach(
            (user: any) => {
              this.users.push(new User(user.id, user.mail, user.type));
            }
          );
        }
      }
    );
    this.readCourses().subscribe(
      (serverResponse: any) => {
        if (serverResponse.statusCode === 200) {
          this.courses = new Array<Course>();
          serverResponse.message.forEach(
            (course: Course) => {
              this.courses.push(new Course(course.id, course.name, course.quarter, course.room, course.teacher));
            }
          );
        }
      }
    );
    this.readInscriptions().subscribe(
      (serverResponse: any) => {
        if (serverResponse.statusCode === 200) {
          this.inscriptions = new Array<Inscription>();
          serverResponse.message.forEach(
            (inscription: Inscription) => {
              this.inscriptions.push(new Inscription(inscription.student, inscription.course));
            }
          );
        }
      }
    );
  }


  createUser(_email, _password, _type) {
    return this.http.post(this.baseUrl + '/createUser', {
      mail: _email,
      password: _password,
      type: _type
    });
  }

  login(_email, _password) {
    return this.http.post(this.baseUrl + '/login', {
      mail: _email,
      password: _password
    });
  }

  readUsers() {
    return this.http.get( this.baseUrl + '/readUsers');
  }

  createCoruse(name, quarter, room, teacher) {
    return this.http.post(this.baseUrl + '/createCourse', {
      name: name,
      quarter: quarter,
      room: room,
      teacher: teacher
    });
  }

  readCourses() {
    return this.http.get(this.baseUrl + '/readCourses');
  }

  createInscription(student, course) {
    return this.http.post(this.baseUrl + '/createInscription', {
      student: student,
      course: course
    });
  }

  readInscriptions () {
    return this.http.get( this.baseUrl + '/readInscriptions');
  }

}
