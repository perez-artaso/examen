import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { RequestingService } from 'src/app/services/requesting.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() users: Array<User>;

  constructor() {
  }

  ngOnInit() {
  }

}
