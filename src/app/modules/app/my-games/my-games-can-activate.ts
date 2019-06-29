import { AbstractAppGuard } from 'src/app/common/abstract-app-guard';
import { AppHelperObject } from 'src/app/common/app-helper-object';
import { Injectable } from '@angular/core';

@Injectable()
export class MyGamesCanActivate extends AbstractAppGuard {

    constructor(appHelperObject: AppHelperObject) {
        super(appHelperObject);
    }

    canActivate(): boolean {
        return this.getConfigProvider().runInNw();
    }
}