import { AbstractAppGuard } from 'src/app/common/abstract-app-guard';
import { Injectable } from '@angular/core';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';

@Injectable()
export class UpdateCanActivate extends AbstractAppGuard {

    constructor(
        protected _helper: AppHelperObject) {
        super(_helper);
    }

    canActivate(): boolean {
        return this.getConfigProvider().runInNw();
    }
}