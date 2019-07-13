import { AbstractAppView } from 'src/app/common/abstract-app-view';
import { AppHelperObject } from 'src/app/common/app-helper-object';
import { SeriesModel } from './series-model';
import { Component } from '@angular/core';

@Component({
    templateUrl: './series-view.html',
    styleUrls: ['./series-view.css']
})
export class SeriesView extends AbstractAppView {

    constructor(appHelperObject: AppHelperObject, seriesModel: SeriesModel) {
        super(appHelperObject, seriesModel);
    }
}