import { Component, OnInit } from '@angular/core';
import * as MotionUI from '../../assets/motion-ui/dist/motion-ui.min';
declare const $: any;

@Component({
  selector: 'app-loaders-menu',
  templateUrl: './loaders-menu.component.html',
  styleUrls: ['./loaders-menu.component.css']
})
export class LoadersMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).foundation();
    MotionUI.animateIn($("#loadersMenu"), "slide-in-left");
  }

}
