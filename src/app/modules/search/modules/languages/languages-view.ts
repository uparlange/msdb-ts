import { AbstractAppView } from '../../../../common/abstract-app-view';
import { AppHelperObject } from '../../../../common/providers/app-helper-object';
import { LanguagesModel } from './languages-model';
import { Component } from '@angular/core';

@Component({
    templateUrl: './languages-view.html',
    styleUrls: ['./languages-view.css']
})
export class LanguagesView extends AbstractAppView {

    constructor(
        protected override _helper: AppHelperObject, 
        public override model: LanguagesModel) {
        super(_helper, model);
    }
}