import { AbstractAppView } from 'src/app/common/abstract-app-view';
import { AppHelperObject } from 'src/app/common/app-helper-object';
import { FavoritesModel } from './favorites-model';
import { Component } from '@angular/core';

@Component({
    templateUrl: './favorites-view.html',
    styleUrls: ['./favorites-view.css']
})
export class FavoritesView extends AbstractAppView {

    constructor(appHelperObject: AppHelperObject, favoritesModel: FavoritesModel) {
        super(appHelperObject, favoritesModel);
    }

}