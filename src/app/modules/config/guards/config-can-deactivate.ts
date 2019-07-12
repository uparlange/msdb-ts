import { AbstractAppGuard } from 'src/app/common/abstract-app-guard';
import { AppHelperObject } from 'src/app/common/app-helper-object';
import { EventEmitter, Injectable } from '@angular/core';
import { ConfigModel } from '../config-model';
import { ConfigView } from '../config-view';

@Injectable()
export class ConfigCanDeactivate extends AbstractAppGuard {

    constructor(appHelperObject: AppHelperObject) {
        super(appHelperObject);
    }

    canDeactivate(component: ConfigView): EventEmitter<any> {
        const eventEmitter: EventEmitter<any> = new EventEmitter();
        setTimeout(() => {
            if ((<ConfigModel>component.model).hasChanges()) {
                this.getLabels().getValues(["L10N_CONFIRM_QUIT"]).subscribe((translations: any) => {
                    eventEmitter.emit(this.getWindowRef().nativeWindow.confirm(translations.L10N_CONFIRM_QUIT));
                });
            }
            else {
                eventEmitter.emit(true);
            }
        }, 0);
        return eventEmitter;
    }
}