import {Component, OnChanges, Input} from 'angular2/core';
import {NgClass} from 'angular2/common';
import {List, Button, Searchbar, Icon} from 'ionic-angular';
import {EventListItemComponent} from "./eventListItem.component";
import {Event} from '../../models/events/event';
import {DateFormatPipe} from 'angular2-moment';
import * as moment from 'moment';

@Component({
    selector: 'events',
    templateUrl: 'build/components/events/events.component.html',
    directives: [List, EventListItemComponent, Button, Searchbar, Icon, NgClass],
    inputs:['events'],
    pipes: [DateFormatPipe]
})

export class EventsComponent implements OnChanges{
  searchQuery: string = '';
  eventsSearch:Event[];
  eventSearchActive:boolean;
  month:string;
  months:string[] = [];
  currentMonthIndex:number = 0;
  @Input() events;

  constructor() {

  }

  ngOnChanges():void{
    if (this.events) {
      let months:string[] = [];
      this.events.forEach((event) => {
       const month:string = moment(event.starts).format('YYYY-MM');
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
     this.months[this.currentMonthIndex];
     this.initializeItems();
    }

  }

  private initializeItems():void {
    if (this.events) {
      this.eventsSearch = this.events.filter((event) => {
        return moment(event.starts).isSame(this.month, 'month');
      });
    }
  }

  private addMonth():void {
    this.searchEvents(this.searchQuery);
    this.month = this.months[this.currentMonthIndex + 1];
    this.initializeItems();
  }

  private subtractMonth():void{
    this.searchEvents(this.searchQuery);
    this.month = this.months[this.currentMonthIndex -1];
    this.initializeItems();
  }

  private searchEvents(search:string):boolean {
    this.initializeItems();

    if (search.trim() == '') {
      return;
    }

    this.eventsSearch = this.eventsSearch.filter((event) => {
      if (event.name.toLowerCase().indexOf(search.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }

}
