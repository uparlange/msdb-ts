import { Injectable } from '@angular/core';
import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';

@Injectable()
export class PageNotFoundModel extends AbstractAppModel {

    constructor(appHelperObject: AppHelperObject) {
        super(appHelperObject);
    }
}