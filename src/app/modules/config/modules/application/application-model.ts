import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { Injectable } from '@angular/core';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';

@Injectable()
export class ApplicationModel extends AbstractAppModel {

    constructor(
        protected _helper: AppHelperObject) {
        super(_helper);
    }

    onInit(): void {
        super.onInit();
        this.data.selectedLanguage = this.getLabels().getCurrentLanguage();
    }

    protected _getInitData(): any {
        return {
            languages: [
                { data: "en", label: "English" },
                { data: "fr", label: "Français" }
            ],
            selectedLanguage: null
        };
    }
}