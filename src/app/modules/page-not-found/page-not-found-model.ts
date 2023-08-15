import { Injectable } from '@angular/core';
import { AbstractAppModel } from '../../common/abstract-app-model';
import { AppHelperObject } from '../../common/providers/app-helper-object';

@Injectable()
export class PageNotFoundModel extends AbstractAppModel {

    constructor(
        protected override _helper: AppHelperObject) {
        super(_helper);
    }
}