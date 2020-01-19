import { AbstractAppView } from 'src/app/common/abstract-app-view';
import { HistoryModel } from './history-model';
import { Component } from '@angular/core';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';

@Component({
    templateUrl: './history-view.html',
    styleUrls: ['./history-view.css']
})
export class HistoryView extends AbstractAppView {

    constructor(
        protected _helper: AppHelperObject,
        public model: HistoryModel) {
        super(_helper, model);
    }

    isImage(value: string): boolean {
        return value.indexOf(".") !== -1;
    }
}