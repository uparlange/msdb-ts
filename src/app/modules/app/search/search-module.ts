import { AbstractModule } from 'src/app/fwk/abstract-module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/common/modules/shared.module';
import { SearchModel } from './search-model';
import { SearchView } from './search-view';

const routes: Routes = [
    {
        path: "",
        component: SearchView,
        children: [
            { path: "description", loadChildren: () => import("./description/description-module").then(mod => mod.DescriptionModule) }
        ]
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        SearchModel
    ],
    declarations: [
        SearchView
    ]
})
export class SearchModule extends AbstractModule {

    constructor() {
        super();
    }
}
