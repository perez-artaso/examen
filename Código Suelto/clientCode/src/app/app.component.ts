import { Component, AfterViewInit } from '@angular/core';
import { SessionService } from './session.service';

declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  constructor(private sessionService: SessionService) {
    setTimeout(() => this.sessionService.onLogin('Juancho'), 5000);
  }

  ngAfterViewInit() {
  }

}
