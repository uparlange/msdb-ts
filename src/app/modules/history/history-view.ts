import { AbstractAppView } from '../../common/abstract-app-view';
import { HistoryModel } from './history-model';
import { Component } from '@angular/core';
import { AppHelperObject } from '../../common/providers/app-helper-object';

@Component({
    templateUrl: './history-view.html',
    styleUrls: ['./history-view.css']
})
export class HistoryView extends AbstractAppView {

    constructor(
        protected override _helper: AppHelperObject,
        public override model: HistoryModel) {
        super(_helper, model);
    }

    isImage(value: string): boolean {
        return value.indexOf(".") !== -1;
    }
}