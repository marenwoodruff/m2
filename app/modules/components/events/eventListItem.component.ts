/**
 * Created by Abbey on 3/10/2016.
 */
import {Component} from 'angular2/core';
import {Event} from '../../events/event';
import {Item} from 'ionic-angular';

@Component({
    selector: "eventListItem",
    templateUrl: 'build/modules/components/events/eventListItem.component.html',
    directives: [Item],
    inputs:['event']
})
export class EventComponent{
    event:Event;
}
