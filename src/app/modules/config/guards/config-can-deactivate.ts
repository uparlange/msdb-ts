import { AbstractAppGuard } from 'src/app/common/abstract-app-guard';
import { EventEmitter, Injectable } from '@angular/core';
import { ConfigModel } from '../config-model';
import { ConfigView } from '../config-view';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';

@Injectable()
export class ConfigCanDeactivate extends AbstractAppGuard {

    constructor(
        protected _helper: AppHelperObject) {
        super(_helper);
    }

    canDeactivate(component: ConfigView): EventEmitter<any> {
        const eventEmitter: EventEmitter<any> = new EventEmitter();
        setTimeout(() => {
            const model = (<ConfigModel>component.model);
            if (model.hasConfigChanges() || model.hasMameIniChanges()) {
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