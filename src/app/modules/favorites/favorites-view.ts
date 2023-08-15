import { AbstractAppView } from '../../common/abstract-app-view';
import { FavoritesModel } from './favorites-model';
import { Component } from '@angular/core';
import { AppHelperObject } from '../../common/providers/app-helper-object';

@Component({
    templateUrl: './favorites-view.html',
    styleUrls: ['./favorites-view.css']
})
export class FavoritesView extends AbstractAppView {

    constructor(
        protected override _helper: AppHelperObject, 
        public override model: FavoritesModel) {
        super(_helper, model);
    }

}