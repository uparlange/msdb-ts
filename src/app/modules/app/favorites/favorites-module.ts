import { AbstractModule } from 'src/app/fwk/abstract-module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../common/modules/shared-module';
import { Routes, RouterModule } from '@angular/router';
import { FavoritesView } from './favorites-view';
import { FavoritesModel } from './favorites-model';

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
