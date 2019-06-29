import { AbstractAppView } from 'src/app/common/abstract-app-view';
import { Component } from '@angular/core';
import { AppHelperObject } from 'src/app/common/app-helper-object';
import { YearsModel } from './years-model';

@Component({
    selector: 'years-view',
    templateUrl: './years-view.html',
    styleUrls: ['./years-view.css']
})
export class YearsView extends AbstractAppView {

    constructor(appHelperObject: AppHelperObject, yearsModel: YearsModel) {
        super(appHelperObject, yearsModel);
    }

    applyFilter(value: string): void {
        this._getModel().applyFilter(value);
    }

    clearFilter(): void {
        this._getModel().clearFilter();
    }

    _getModel(): YearsModel {
        return <YearsModel>this.model;
    }
}