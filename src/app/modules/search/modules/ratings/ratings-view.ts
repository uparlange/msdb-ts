import { AbstractAppView } from 'src/app/common/abstract-app-view';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';
import { RatingsModel } from './ratings-model';
import { Component } from '@angular/core';

@Component({
    templateUrl: './ratings-view.html',
    styleUrls: ['./ratings-view.css']
})
export class RatingsView extends AbstractAppView {

    constructor(appHelperObject: AppHelperObject, ratingsModel: RatingsModel) {
        super(appHelperObject, ratingsModel);
    }
}