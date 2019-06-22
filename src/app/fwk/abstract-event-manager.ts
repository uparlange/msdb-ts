import { AbstractClass } from './abstract-class';
import { EventEmitter } from '@angular/core';

export class AbstractEventManager extends AbstractClass {

    _eventEmitters: Map<string, EventEmitter<any>> = new Map();

    constructor() {
        super();
    }

    on(eventName: string): EventEmitter<any> {
        let eventEmitter: EventEmitter<any> = this._eventEmitters.get(eventName);
        if (eventEmitter === undefined) {
            eventEmitter = new EventEmitter();
            this._eventEmitters.set(eventName, eventEmitter);
        }
        return eventEmitter;
    }

    emit(eventName: string, evt: any) {
        const eventEmitter: EventEmitter<any> = this._eventEmitters.get(eventName);
        if (eventEmitter !== undefined) {
            eventEmitter.emit(evt);
        }
    }
}
