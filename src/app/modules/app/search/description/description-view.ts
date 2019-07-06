import { AppHelperObject } from 'src/app/common/app-helper-object';
import { DescriptionModel } from './description-model';
import { Component } from '@angular/core';
import { AbstractAppView } from 'src/app/common/abstract-app-view';

@Component({
    templateUrl: './description-view.html',
    styleUrls: ['./description-view.css']
})
export class DescriptionView extends AbstractAppView {

    constructor(appHelperObject: AppHelperObject, descriptionModel: DescriptionModel) {
        super(appHelperObject, descriptionModel);
    }
}
