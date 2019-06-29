import { AbstractAppView } from 'src/app/common/abstract-app-view';
import { AppHelperObject } from 'src/app/common/app-helper-object';
import { CategoriesModel } from './categories-model';
import { Component } from '@angular/core';

@Component({
    selector: 'categories-view',
    templateUrl: './categories-view.html',
    styleUrls: ['./categories-view.css']
})
export class CategoriesView extends AbstractAppView {

    constructor(appHelperObject: AppHelperObject, categoriesModel: CategoriesModel) {
        super(appHelperObject, categoriesModel);
    }

    showSubCategory(item: any): void {
        this.getRouter().navigate([], { queryParams: { category: item.label } });
    }

    showCategoryItems(item: any): void {
        this.getRouter().navigate(["/result"], { queryParams: { type: "category", value: item.data } });
    }
}