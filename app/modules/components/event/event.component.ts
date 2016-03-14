import {Component, OnInit, OnDestroy, Input} from 'angular2/core';

@Component({
  selector: 'event',
  templateUrl: 'build/modules/components/event/event.component.html',
  inputs:['event']
})

export class EventComponent implements OnInit{
  event:Event;
  visible: boolean = false;

  constructor() {

  }
  ngOnInit():any{

  }
  toggleSessions() {
    this.visible = !this.visible;
  }
}
