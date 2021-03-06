import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';
import { Injectable } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';

@Injectable()
export class CategoriesModel extends AbstractAppModel {

    constructor(
        protected _helper: AppHelperObject) {
        super(_helper);
    }

    onRefresh(callback: Function): void {
        super.onRefresh(callback);
        const categories = [];
        const category_map = {};
        this.getMsdbProvider().getCategories().subscribe((data: any) => {
            data.forEach((item: any) => {
                const item_split = item.label.split("/");
                const category = item_split[0].trim();
                if (category_map[category] == null) {
                    category_map[category] = {
                        label: category,
                        data: category,
                        children: []
                    }
                    categories.push(category_map[category]);
                }
                category_map[category].children.push({
                    label: (item_split.length > 1) ? item_split[1].trim() : category,
                    data: item.label
                });
            });
            this.data.dataSource.data = categories;
            callback();
        });
    }

    private _transformer(node: any, level: number): any {
        return {
            expandable: !!node.children,
            label: node.label,
            data: node.data,
            level: level
        };
    }

    protected _getInitData(): any {
        const treeControl: FlatTreeControl<any> = new FlatTreeControl(node => node.level, node => node.expandable);
        const treeFlattener: MatTreeFlattener<any, any> = new MatTreeFlattener(this._transformer, node => node.level, node => node.expandable, node => node.children);
        return {
            dataSource: new MatTreeFlatDataSource(treeControl, treeFlattener),
            treeControl: treeControl
        };
    }
}