import { AbstractAppView } from 'src/app/common/abstract-app-view';
import { Component } from '@angular/core';
import { AppHelperObject } from 'src/app/common/app-helper-object';
import { YearsModel } from './years-model';

@Component({
    templateUrl: './years-view.html',
    styleUrls: ['./years-view.css']
})
export class YearsView extends AbstractAppView {

    constructor(appHelperObject: AppHelperObject, yearsModel: YearsModel) {
        super(appHelperObject, yearsModel);
    }
}