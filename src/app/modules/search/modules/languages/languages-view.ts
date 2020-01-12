import { AbstractAppView } from 'src/app/common/abstract-app-view';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';
import { LanguagesModel } from './languages-model';
import { Component } from '@angular/core';

@Component({
    templateUrl: './languages-view.html',
    styleUrls: ['./languages-view.css']
})
export class LanguagesView extends AbstractAppView {

    constructor(
        protected _helper: AppHelperObject, 
        public model: LanguagesModel) {
        super(_helper, model);
    }
}