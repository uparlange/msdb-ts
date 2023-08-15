import { AbstractModule } from '../../fwk/abstract-module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../common/modules/shared-module';
import { SearchModel } from './search-model';
import { SearchView } from './search-view';

const routes: Routes = [
    {
        path: "",
        component: SearchView,
        children: [
            { path: "description", loadChildren: () => import("./modules/description/description-module").then(mod => mod.DescriptionModule) },
            { path: "ratings", loadChildren: () => import("./modules/ratings/ratings-module").then(mod => mod.RatingsModule) },
            { path: "categories", loadChildren: () => import("./modules/categories/categories-module").then(mod => mod.CategoriesModule) },
            { path: "series", loadChildren: () => import("./modules/series/series-module").then(mod => mod.SeriesModule) },
            { path: "years", loadChildren: () => import("./modules/years/years-module").then(mod => mod.YearsModule) },
            { path: "languages", loadChildren: () => import("./modules/languages/languages-module").then(mod => mod.LanguagesModule) },
            { path: "versions", loadChildren: () => import("./modules/versions/versions-module").then(mod => mod.VersionsModule) },
            { path: "manufacturers", loadChildren: () => import("./modules/manufacturers/manufacturers-module").then(mod => mod.ManufacturersModule) }
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
