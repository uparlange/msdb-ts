import { AbstractAppView } from 'src/app/common/abstract-app-view';
import { HistoryModel } from './history-model';
import { Component } from '@angular/core';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';

@Component({
    templateUrl: './history-view.html',
    styleUrls: ['./history-view.css']
  })
export class HistoryView extends AbstractAppView {

    constructor(appHelperObject: AppHelperObject, historyModel: HistoryModel) {
        super(appHelperObject, historyModel);
    }
}