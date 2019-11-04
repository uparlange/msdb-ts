import { AbstractManager } from '../abstract-manager';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: "root" })
export class EventManager extends AbstractManager {

    constructor() {
        super();
    }
}
