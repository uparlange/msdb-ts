import { AbstractModule } from 'src/app/fwk/abstract-module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/common/modules/shared-module';
import { SearchModel } from './search-model';
import { SearchView } from './search-view';

const routes: Routes = [
    {
        path: "",
        component: SearchView,
        children: [
            { path: "description", loadChildren: () => import("./description/description-module").then(mod => mod.DescriptionModule) },
            { path: "ratings", loadChildren: () => import("./ratings/ratings-module").then(mod => mod.RatingsModule) },
            { path: "categories", loadChildren: () => import("./categories/categories-module").then(mod => mod.CategoriesModule) },
            { path: "series", loadChildren: () => import("./series/series-module").then(mod => mod.SeriesModule) }
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
