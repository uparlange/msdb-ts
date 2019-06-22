import { AppClassHelper } from 'src/app/common/app-class-helper';
import { DescriptionModel } from './description-model';
import { Component } from '@angular/core';
import { AbstractAppView } from 'src/app/common/abstract-app-view';

@Component({
    selector: 'description-view',
    templateUrl: './description-view.html',
    styleUrls: ['./description-view.css']
})
export class DescriptionView extends AbstractAppView {

    constructor(appClassHelper: AppClassHelper, descriptionModel: DescriptionModel) {
        super(appClassHelper, descriptionModel);
    }
}
