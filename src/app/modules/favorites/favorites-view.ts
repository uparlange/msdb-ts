import { AbstractAppView } from 'src/app/common/abstract-app-view';
import { FavoritesModel } from './favorites-model';
import { Component } from '@angular/core';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';

@Component({
    templateUrl: './favorites-view.html',
    styleUrls: ['./favorites-view.css']
})
export class FavoritesView extends AbstractAppView {

    constructor(appHelperObject: AppHelperObject, favoritesModel: FavoritesModel) {
        super(appHelperObject, favoritesModel);
    }

}