import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { AppHelperObject } from 'src/app/common/app-helper-object';
import { MsdbProvider } from 'src/app/common/msdb-provider';
import { Injectable } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material';

@Injectable()
export class CategoriesModel extends AbstractAppModel {

    constructor(appHelperObject: AppHelperObject, msdbProvider: MsdbProvider) {
        super(appHelperObject, msdbProvider);
    }

    onRefresh(callback: Function): void {
        super.onRefresh(callback);
        const categories = [];
        const category_map = {};
        this.getProvider().getCategories().subscribe((data: any) => {
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

    hasChild(_: number, _nodeData: any): boolean {
        return _nodeData.expandable;
    }

    _transformer(node: any, level: number) {
        return {
            expandable: !!node.children,
            label: node.label,
            data: node.data,
            level: level
        };
    }

    _getInitData(): any {
        const treeControl: FlatTreeControl<any> = new FlatTreeControl(node => node.level, node => node.expandable);
        const treeFlattener: MatTreeFlattener<any, any> = new MatTreeFlattener(this._transformer, node => node.level, node => node.expandable, node => node.children);
        return {
            dataSource: new MatTreeFlatDataSource(treeControl, treeFlattener),
            treeControl: treeControl
        };
    }
}