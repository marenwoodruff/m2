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
  month:any;
  months:any = [];
  currentMonthIndex:number = 0;
  @Input() events;

  constructor() {

  }


  ngOnChanges(){
    if (this.events) {
      let months:any = [];
      this.events.forEach((event) => {
       const month = moment(event.starts).format('YYYY-MM');
        if(!months.includes(month)) {
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
    }

    this.initializeItems();

  }

  initializeItems() {
    if (this.events) {
      this.eventsSearch = this.events.filter((event) => {
        return moment(event.starts).isSame(this.month, 'month');
      });
    }
  }

  addMonth() {
    this.month = this.months[this.currentMonthIndex + 1];
    this.initializeItems();
  }

  subtractMonth() {
    this.month = this.months[this.currentMonthIndex -1];
    this.initializeItems();
  }

  searchEvents(searchBar) {
    this.initializeItems();

    var q = searchBar.value;

    if (q.trim() == '') {
      return;
    }

    this.eventsSearch = this.eventsSearch.filter((v) => {
      if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }

}
