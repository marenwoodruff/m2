import {Component, OnChanges} from '@angular/core';
import {Event} from '../../models/events/event';
import {UserEvent} from '../../models/user/userEvent';
import {EventPage} from '../../pages/event/event.page';
import {EventsPage} from '../../pages/events/events.page';
import {Item, Nav, Button, ItemSliding, Alert} from 'ionic-angular';
import {DateFormatPipe, FromUnixPipe} from 'angular2-moment';

import {UserService} from '../../service/user.service';
import {UserEventService} from '../../service/userEvent.service';

@Component({
    selector: "eventListItem",
    templateUrl: 'build/components/events/eventListItem.component.html',
    directives: [Item, EventPage, Button, ItemSliding],
    inputs:['event', 'location', 'userEvents'],
    pipes:[DateFormatPipe, FromUnixPipe]
})
export class EventListItemComponent implements OnChanges {
    event: Event;
    currentLocation: Array<number>;
    location: Array<number>;
    userId: number;
    userEvents: UserEvent[];

    constructor(private nav: Nav, private _userApi: UserService, private _userEventApi: UserEventService){ }

    ngOnChanges() {
      this.currentLocation = this.location;
    }

    viewEvent(event) {
      this.nav.push(EventPage, { event, location: this.currentLocation })
          .then(
              response => { console.log('Response ' + response);
              },
              error => { console.log('error ' + error);
              }
          ).catch(exception => {
              console.log('Exception ' + exception);
          })
    }

    deleteEvent(event) {
       this.getUserId();
       let uEvent = this.userEvents.filter((userEvent) => {
            if (userEvent.eventId === event.eventId) {
                return true;
            }
       });
       this.deleteAlert(uEvent[0].id);
    }

    deleteAlert(eventId: number) {
        let confirm = Alert.create({
            title: 'Are you sure you want to remove this event?',
            message: 'Deleting this event does not remove you from the list of participants. Follow the instructions from your confirmation e-mail.',
            buttons: [
                {
                    text: 'Remove Event',
                    handler: () => {
                        this._userEventApi.deleteUserEvent(this.userId, eventId);
                        this.nav.setRoot(EventsPage);
                    }
                },
                {
                    text: 'Cancel',
                    handler: () => {
                        console.log('cancel');
                    }
                }
            ]
        });
        this.nav.present(confirm);
    }

    getUserId() {
       this.userId = this._userApi.getUserId();
    }

}
