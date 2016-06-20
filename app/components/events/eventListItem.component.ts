import {Component, OnChanges, OnInit} from '@angular/core';
import {Event} from '../../models/events/event';
import {UserEvent} from '../../models/user/userEvent';
import {EventPage} from '../../pages/event/event.page';
import {EventSoloPage} from '../../pages/event-solo/event-solo.page';
import {EventsPage} from '../../pages/events/events.page';
import {Item, Nav, Button, ItemSliding, Alert} from 'ionic-angular';
import {DateFormatPipe, FromUnixPipe} from 'angular2-moment';

import {UserService} from '../../service/user.service';
import {UserEventService} from '../../service/userEvent.service';

@Component({
    selector: "eventListItem",
    templateUrl: 'build/components/events/eventListItem.component.html',
    directives: [Item, Button, ItemSliding],
<<<<<<< HEAD
    inputs:['event', 'location', 'userEvents'],
    pipes:[DateFormatPipe, FromUnixPipe]
})
export class EventListItemComponent implements OnChanges {
=======
    inputs: ['event', 'location', 'userEvents'],
    pipes: [DateFormatPipe, FromUnixPipe]
})
export class EventListItemComponent implements OnChanges, OnInit {
>>>>>>> upstream/master
    event: Event;
    currentLocation: Array<number>;
    location: Array<number>;
    userId: number;
    userEvents: UserEvent[];
    public imageThumbnail: boolean;

    constructor(private nav: Nav, private _userApi: UserService, private _userEventApi: UserEventService) { }

    ngOnInit() {
        let
            imageThumbnail = true,
            mobileSmall = this.event.mobileSmall,
            mobileLarge = this.event.mobileLarge;

        if (mobileSmall == "" || mobileLarge == "") { 
            this.imageThumbnail = false;
        } else {
            this.imageThumbnail = true;
        }
    }

    ngOnChanges() {
        this.currentLocation = this.location;
    }

    viewEvent(event) {
<<<<<<< HEAD
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
=======
        this.nav.push(EventPage, { event, location: this.currentLocation });
    }

    deleteEvent(event) {
        this.getUserId();
        let uEvent = this.userEvents.filter((userEvent) => {
            if (userEvent.eventId === event.eventId) {
                return true;
            }
        });
        this.deleteAlert(uEvent[0].id);
>>>>>>> upstream/master
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
<<<<<<< HEAD

}
=======
}
>>>>>>> upstream/master
