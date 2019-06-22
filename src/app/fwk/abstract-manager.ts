import { AbstractEventManager } from './abstract-event-manager';

export class AbstractManager extends AbstractEventManager {

    constructor() {
        super();
    }

    init(): void {
        // need override
    }
}
