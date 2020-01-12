import { AbstractAppView } from 'src/app/common/abstract-app-view';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';
import { CategoriesModel } from './categories-model';
import { Component } from '@angular/core';

@Component({
    templateUrl: './categories-view.html',
    styleUrls: ['./categories-view.css']
})
export class CategoriesView extends AbstractAppView {

    constructor(
        protected _helper: AppHelperObject, 
        public model: CategoriesModel) {
        super(_helper, model);
    }

    hasChild(_: number, _nodeData: any): boolean {
        return _nodeData.expandable;
    }

    showSubCategory(item: any): void {
        this.getRouter().navigate([], { queryParams: { category: item.label } });
    }

    showCategoryItems(item: any): void {
        this.getRouter().navigate(["/result"], { queryParams: { type: "category", value: item.data } });
    }
}