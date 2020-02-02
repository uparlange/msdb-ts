import { AbstractAppView } from 'src/app/common/abstract-app-view';
import { Component } from '@angular/core';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';
import { ApplicationModel } from './application-model';

@Component({
    templateUrl: './application-view.html',
    styleUrls: ['./application-view.css']
})
export class ApplicationView extends AbstractAppView {

    constructor(
        protected _helper: AppHelperObject,
        public model: ApplicationModel) {
        super(_helper, model);
    }

    onLanguageChanged(event: any) {
        this.getLabels().setLanguage(event.value);
    }

}