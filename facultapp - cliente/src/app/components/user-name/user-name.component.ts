import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-user-name',
  templateUrl: './user-name.component.html',
  styleUrls: ['./user-name.component.css']
})
export class UserNameComponent implements OnInit {

  show: boolean;
  nameToShow: string;

  constructor(private session: SessionService) { 
    this.show = false;
    this.nameToShow = '';
    this.session.loggedInObservable.subscribe(
      (email: string) => {
        this.show = true;
        this.nameToShow = email;
      }
    );
    this.session.loggedOutObservable.subscribe(
      () => {
        this.show = false;
        this.nameToShow = '';
      }
    );
  }

  ngOnInit() {

  }

}
