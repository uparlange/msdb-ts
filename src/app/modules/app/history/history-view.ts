import { AbstractAppView } from 'src/app/common/abstract-app-view';
import { AppHelperObject } from 'src/app/common/app-helper-object';
import { HistoryModel } from './history-model';
import { Component } from '@angular/core';

@Component({
    selector: 'history-view',
    templateUrl: './history-view.html',
    styleUrls: ['./history-view.css']
  })
export class HistoryView extends AbstractAppView {

    constructor(appHelperObject: AppHelperObject, historyModel: HistoryModel) {
        super(appHelperObject, historyModel);
    }
}