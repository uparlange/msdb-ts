import { EventEmitter } from '@angular/core';
import { AbstractObject } from './abstract-object';

export class AbstractEventManager extends AbstractObject {

    protected _eventEmitters: Map<string, any> = new Map();

    constructor() {
        super();
    }

    on(eventName: string): EventEmitter<any> {
        let eventEmitter: any = this._eventEmitters.get(eventName);
        if (eventEmitter === undefined) {
            eventEmitter = new EventEmitter();
            this._eventEmitters.set(eventName, eventEmitter);
        }
        return eventEmitter;
    }

    emit(eventName: string, evt?: any) {
        const eventEmitter: any = this._eventEmitters.get(eventName);
        if (eventEmitter !== undefined) {
            eventEmitter.emit(evt);
        }
    }
}
