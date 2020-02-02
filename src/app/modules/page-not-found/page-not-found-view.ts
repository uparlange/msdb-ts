import { AbstractAppView } from 'src/app/common/abstract-app-view';
import { Component } from '@angular/core';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';
import { PageNotFoundModel } from './page-not-found-model';
import { environment } from './../../../environments/environment';

@Component({
    templateUrl: './page-not-found-view.html',
    styleUrls: ['./page-not-found-view.css']
})
export class PageNotFoundView extends AbstractAppView {

    constructor(
        protected _helper: AppHelperObject, 
        public model: PageNotFoundModel) {
        super(_helper, model);
    }

    getDeadLinkUrl() {
        return environment.assetsFolder + "/images/deadlink.jpg";
    }
}