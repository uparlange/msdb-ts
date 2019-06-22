import { HomeModel } from './home-model';
import { Component } from '@angular/core';
import { AppClassHelper } from 'src/app/common/app-class-helper';
import { AbstractAppView } from 'src/app/common/abstract-app-view';

@Component({
    selector: 'home-view',
    templateUrl: './home-view.html',
    styleUrls: ['./home-view.css']
})
export class HomeView extends AbstractAppView {

    constructor(appClassHelper: AppClassHelper, homeModel: HomeModel) {
        super(appClassHelper, homeModel);
    }
}
