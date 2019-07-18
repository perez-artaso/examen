import { Component, OnInit } from '@angular/core';
import { RequestingService } from 'src/app/services/requesting.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: Array<User>;
  allUsers: Array<User>;

  constructor(private requester: RequestingService) {
    this.users = new Array<User>();
    this.allUsers = new Array<User>();
  }

  ngOnInit() {
    this.requester.readUsers().subscribe(
      (serverResponse: any) => {
        if (serverResponse.statusCode === 200) {
          serverResponse.message.forEach(
            (user: any) => this.allUsers.push(
              new User (user.id, user.mail, user.type)
            )
          );
        }
      }
    );
  }

  typeSelected(_type: number) {
    this.users = this.allUsers.filter((user: User) =>
      user.type == _type
    );
  }

}
