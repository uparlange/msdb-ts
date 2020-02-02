import { AbstractAppView } from 'src/app/common/abstract-app-view';
import { Component } from '@angular/core';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';
import { NwjsModel } from './nwjs-model';

@Component({
    templateUrl: './nwjs-view.html',
    styleUrls: ['./nwjs-view.css']
})
export class NwjsView extends AbstractAppView {

    constructor(
        protected _helper: AppHelperObject,
        public model: NwjsModel) {
        super(_helper, model);
    }

}