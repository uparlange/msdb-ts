import { AbstractModule } from '../../fwk/abstract-module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavoritesView } from './favorites-view';
import { FavoritesModel } from './favorites-model';
import { SharedModule } from '../../common/modules/shared-module';

const routes: Routes = [
    { path: "", component: FavoritesView }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        FavoritesModel
    ],
    declarations: [
        FavoritesView
    ]
})
export class FavoritesModule extends AbstractModule {

    constructor() {
        super();
    }
}
