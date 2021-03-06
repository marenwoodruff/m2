import {Component, OnChanges, OnInit} from '@angular/core';
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
    directives: [Item, Button, ItemSliding],
    inputs: ['event', 'location', 'userEvents'],
    pipes: [DateFormatPipe, FromUnixPipe]
})

export class EventListItemComponent implements OnChanges, OnInit {
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

        if (mobileSmall == "") {
            this.imageThumbnail = false;
        } else if (mobileLarge == "") {
            this.imageThumbnail = false;
        } else {
            this.imageThumbnail = true;
        }
    }

    ngOnChanges() {
        this.currentLocation = this.location;
    }

    viewEvent(event) {
        this.nav.push(EventPage, { event, location: this.currentLocation });
    }

    deleteEvent(event:Event, slidingItem: ItemSliding) {
        this.getUserId();
        let uEvent = this.userEvents.filter((userEvent) => {
            if (userEvent.eventId === event.eventId) {
                return true;
            }
        });
        this.deleteAlert(uEvent[0].id, slidingItem);
    }

    deleteAlert(eventId: number, slidingItem: ItemSliding) {
        let confirm = Alert.create({
            title: 'Are you sure you want to remove this event?',
            message: 'Deleting this event does not remove you from the list of participants. Follow the instructions from your confirmation e-mail.',
            buttons: [
                {
                    text: 'Remove Event',
                    handler: () => {
                        slidingItem.close();
                        this._userEventApi.deleteUserEvent(this.userId, eventId);
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
