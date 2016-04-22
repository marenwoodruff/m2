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
    inputs:['events', 'location'],
    pipes: [DateFormatPipe]
})

export class EventsComponent implements OnChanges{
  searchQuery: string = '';
  eventsSearch:Event[];
  eventSearchActive:boolean;
  month:string;
  months:string[] = [];
  currentMonthIndex:number = 0;
  showLeftButton:boolean;
  showRightButton:boolean;
  @Input() events;

  constructor() {}

  ngOnChanges():void{
    if (this.events) {
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
        return moment.unix(event.startDate).isSame(this.month, 'month');
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
    this.showLeftButton = this.currentMonthIndex === 0 ? false : true;
    this.showRightButton = this.currentMonthIndex === (this.months.length - 1) ? false : true;
  }

  private searchEvents(search:string):boolean {
    this.initializeItems();

    if (search.trim() == '') {
      return;
    }

    this.eventsSearch = this.eventsSearch.filter((event) => {
      if (event.title.toLowerCase().indexOf(search.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }

}
