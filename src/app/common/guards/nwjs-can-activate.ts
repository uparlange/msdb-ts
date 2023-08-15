import { AbstractAppGuard } from '../../common/abstract-app-guard';
import { Injectable } from '@angular/core';
import { AppHelperObject } from '../../common/providers/app-helper-object';

@Injectable()
export class NwjsCanActivate extends AbstractAppGuard {

    constructor(
        protected override _helper: AppHelperObject) {
        super(_helper);
    }

    canActivate(): boolean {
        return this.getConfigProvider().runInNw();
    }
}