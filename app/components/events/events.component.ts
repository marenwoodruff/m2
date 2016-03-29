import {Component, OnChanges, Input} from 'angular2/core';
import {List, Button, Searchbar, Icon} from 'ionic-angular';
import {EventListItemComponent} from "./eventListItem.component";
import {EventService} from "../../service/event.service";
import {Event} from '../../models/events/event';

@Component({
    selector: 'events',
    templateUrl: 'build/components/events/events.component.html',
    directives: [List, EventListItemComponent, Button, Searchbar, Icon],
    inputs:['events'],
    providers:[EventService]
})

export class EventsComponent implements OnChanges{
  private _eventsApi:EventService;
  searchQuery: string = '';
  eventsSearch:Event[];
  @Input() events;

  constructor(eventService:EventService) {
    this._eventsApi = eventService;

  }
  ngOnChanges(){
    this.initializeItems();
  }


  initializeItems() {
    this.eventsSearch = this.events;
  }

  getEvents(searchBar) {
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
