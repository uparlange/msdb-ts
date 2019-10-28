import { AbstractAppView } from 'src/app/common/abstract-app-view';
import { Component } from '@angular/core';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';
import { PageNotFoundModel } from './page-not-found-model';

@Component({
    templateUrl: './page-not-found-view.html',
    styleUrls: ['./page-not-found-view.css']
})
export class PageNotFoundView extends AbstractAppView {

    constructor(appHelperObject: AppHelperObject, pageNotFoundModel: PageNotFoundModel) {
        super(appHelperObject, pageNotFoundModel);
    }
}