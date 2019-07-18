import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.css']
})
export class CurrentUserComponent implements OnInit {

  nameToShow: string;
  showName: boolean;
  constructor(private sessionService: SessionService) {
    this.sessionService.toObserve.subscribe(
      () => {
        this.nameToShow = this.sessionService.userName;
        this.showName = true;
      }
    );
  }

  ngOnInit() {

  }

}
