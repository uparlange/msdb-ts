import { AbstractAppView } from 'src/app/common/abstract-app-view';
import { AppHelperObject } from 'src/app/common/app-helper-object';
import { LanguagesModel } from './languages-model';
import { Component } from '@angular/core';

@Component({
    selector: 'languages-view',
    templateUrl: './languages-view.html',
    styleUrls: ['./languages-view.css']
})
export class LanguagesView extends AbstractAppView {

    constructor(appHelperObject: AppHelperObject, languagesModel: LanguagesModel) {
        super(appHelperObject, languagesModel);
    }
}