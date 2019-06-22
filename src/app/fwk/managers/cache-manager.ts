import { AbstractManager } from '../abstract-manager';
import Dexie from 'dexie';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class CacheManager extends AbstractManager {

    _db: Dexie = null;

    constructor() {
        super();
        this._db = new Dexie("MSDB");
        this._db.version(1).stores({
            properties: "key, namespace"
        });
    }

    setItem(key: string, newValue: any, namespace: string): EventEmitter<any> {
        const eventEmitter: EventEmitter<any> = new EventEmitter();
        this.getItem(key, undefined).subscribe((oldValue: any) => {
            this._db["properties"].put({ key: key, value: newValue, namespace: (namespace || "default") });
            const change = {
                key: key,
                oldValue: oldValue,
                newValue: newValue
            };
            this.emit("change", change);
            eventEmitter.emit(change);
        });
        return eventEmitter;
    }

    getItem(key: string, defaultValue: any): EventEmitter<any> {
        const eventEmitter: EventEmitter<any> = new EventEmitter();
        this._db["properties"].get({ key: key }).then((property) => {
            let value = null;
            if (property != undefined) {
                value = property.value;
            } else if (defaultValue != undefined) {
                value = defaultValue;
            }
            eventEmitter.emit(value);
        });
        return eventEmitter;
    }

    deleteNamespace(namespace: string): void {
        this._db["properties"].where("namespace").equals(namespace).delete().then((deleteCount) => {
            //this.getLogger().debug("Deleted " + deleteCount + " objects from cache");
        });
    }
}
