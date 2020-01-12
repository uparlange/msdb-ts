import { AbstractAppView } from 'src/app/common/abstract-app-view';
import { Component } from '@angular/core';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';
import { MyGamesModel } from './my-games-model';

@Component({
    templateUrl: './my-games-view.html',
    styleUrls: ['./my-games-view.css']
})
export class MyGamesView extends AbstractAppView {

    constructor(
        protected _helper: AppHelperObject, 
        public model: MyGamesModel) {
        super(_helper, model);
    }
}