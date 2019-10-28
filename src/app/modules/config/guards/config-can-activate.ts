import { AbstractAppGuard } from 'src/app/common/abstract-app-guard';
import { Injectable } from '@angular/core';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';

@Injectable()
export class ConfigCanActivate extends AbstractAppGuard {

    constructor(appHelperObject: AppHelperObject) {
        super(appHelperObject);
    }

    canActivate(): boolean {
        return this.getConfigProvider().runInNw();
    }
}