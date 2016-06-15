import {Component, OnChanges, Input} from '@angular/core';
import {NgClass} from '@angular/common';
import {List, Button, Searchbar, Icon} from 'ionic-angular';
import {EventListItemComponent} from "./eventListItem.component";
import {Event} from '../../models/events/event';
import {UserEvent} from '../../models/user/userEvent';
import {DateFormatPipe} from 'angular2-moment';
import * as moment from 'moment';

@Component({
    selector: 'events',
    templateUrl: 'build/components/events/events.component.html',
    directives: [List, EventListItemComponent, Button, Searchbar, Icon, NgClass],
    inputs:['events', 'location', 'userEvents'],
    pipes: [DateFormatPipe]
})

export class EventsComponent implements OnChanges {
  searchQuery: string = '';
  userEvents: UserEvent[] = this.userEvents;
  userEventsCount: number;
  eventsSearch:Event[];
  eventSearchActive:boolean;
  eventsCount: number;
  month:string;
  months:string[] = [];
  currentMonthIndex:number = 0;
  showLeftButton:boolean;
  showRightButton:boolean;
  @Input() events;

  constructor() { }

  ngOnChanges():void{
    this.setDates();
  }

  private setDates():void{
      console.log(this.userEvents);
    this.userEvents ? this.userEventsCount = this.userEvents.length : this.userEventsCount;
    if (this.events) {
      this.eventsCount = this.events.length;
      let months:string[] = [];
      this.events.forEach((event) => {
       const month:string = moment.unix(event.startDate).format('YYYY-MM');
        if(months.indexOf(month) === -1) {
          months.push(month);
        }
     });

     months.forEach((month) => {
       if (this.months.length === 0) {
         this.months.push(month);
       } else {
         if (moment(this.months[0]).isBefore(month)) {
           this.months.push(month);
         } else {
           this.months.unshift(month);
         }
       }
     });
      this.month = this.months[this.currentMonthIndex];
      this.initializeItems();
      this.showHideArrows()
    }
  }

  private initializeItems():void {
    if (this.events) {
      this.eventsSearch = this.events.filter((event) => {
        return (moment.unix(event.startDate).isSame(this.month, 'month') && !event.paidEvent);
      });
    }
  }

  private addMonth():void {
    this.searchEvents(this.searchQuery);
    const nextMonthIndex = this.currentMonthIndex + 1;
    if (nextMonthIndex < this.months.length){
      this.month = this.months[nextMonthIndex];
      this.currentMonthIndex = nextMonthIndex;
      this.initializeItems();
      this.showHideArrows()
    }

  }

  private subtractMonth():void{
    this.searchEvents(this.searchQuery);
    const nextMonthIndex = this.currentMonthIndex - 1;
    if (nextMonthIndex >= 0){
      this.month = this.months[nextMonthIndex];
      this.currentMonthIndex = nextMonthIndex;
      this.initializeItems();
      this.showHideArrows()
    }

  }

  private showHideArrows():void {
    if (this.events.length > 1) {
      this.showLeftButton = this.currentMonthIndex === 0 ? false : true;
      this.showRightButton = this.currentMonthIndex === (this.months.length - 1) ? false : true;
    }
  }

  private searchEvents(search:string):boolean {
    this.initializeItems();

    if (search.trim() == '') {
      return;
    }

    this.eventsSearch = this.eventsSearch.filter((event) => {
      const searchString = search.toLowerCase();
      if (event.title.toLowerCase().includes(searchString) || event.city.toLowerCase().includes(searchString)
          || event.state.toLowerCase().includes(searchString) || event.corpLocation.toLowerCase().includes(searchString) ||
          event.topic.toLowerCase().includes(searchString) || event.type.toLowerCase().includes(searchString)) {
        return true;
      }
      return false;
    })
  }

}
