import { AbstractAppModel } from '../../../../common/abstract-app-model';
import { AppHelperObject } from '../../../../common/providers/app-helper-object';
import { Injectable } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';

@Injectable()
export class CategoriesModel extends AbstractAppModel {

    constructor(
        protected override _helper: AppHelperObject) {
        super(_helper);
    }

    override onRefresh(callback: Function): void {
        super.onRefresh(callback);
        const categories:Array<any> = [];
        const category_map:Map<String, any> = new Map();
        this.getMsdbProvider().getCategories().subscribe((data: any) => {
            data.forEach((item: any) => {
                const item_split = item.label.split("/");
                const category:String = item_split[0].trim();
                if (category_map.get(category) == null) {
                    category_map.set(category, {
                        label: category,
                        data: category,
                        children: []
                    });
                    categories.push(category_map.get(category));
                }
                category_map.get(category).children.push({
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

    protected override _getInitData(): any {
        const treeControl: FlatTreeControl<any> = new FlatTreeControl(node => node.level, node => node.expandable);
        const treeFlattener: MatTreeFlattener<any, any> = new MatTreeFlattener(this._transformer, node => node.level, node => node.expandable, node => node.children);
        return {
            dataSource: new MatTreeFlatDataSource(treeControl, treeFlattener),
            treeControl: treeControl
        };
    }
}