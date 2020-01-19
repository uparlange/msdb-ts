import { Injectable } from '@angular/core';
import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';

@Injectable()
export class HomeModel extends AbstractAppModel {

    constructor(
        protected _helper: AppHelperObject) {
        super(_helper);
    }

    onInit(): void {
        super.onInit();
        this.getCache().getItem("searchLastType", "description").subscribe((value: string) => {
            this.data.searchLastType = value;
        });
    }

    onRefresh(callback: Function): void {
        super.onRefresh(callback);
        if (this.data.mame.build === null) {
            this.getMsdbProvider().getMameInfos().subscribe((data: any) => {
                if (data !== null) {
                    data.version = data.build.substr(0, data.build.indexOf("(")).trim();
                    this.data.mame = data;
                    if (this.data.randomGame.detail === null) {
                        this.getMsdbProvider().getRandomGame().subscribe((data: any) => {
                            if (data !== null) {
                                this.data.randomGame.detail = data;
                                const images = [];
                                data.images.forEach((image: any) => {
                                    if (image.name.indexOf(".ico") === -1) {
                                        images.push({
                                            name: image.name,
                                            src: `${this.getGameFolder(data)}/${image.name}`,
                                            w: image.width,
                                            h: image.height
                                        });
                                    }
                                });
                                this.data.randomGame.images = images;
                                callback();
                            }
                        });
                    }
                } else {
                    callback();
                }

            });
        }
    }

    protected _getInitData(): any {
        return {
            searchLastType: null,
            mame: {
                build: null
            },
            randomGame: {
                images: [],
                detail: null
            },
            searchTypes: [
                { index: 0, key: "L10N_SEARCH_BY_DESCRIPTION", type: "description" },
                { index: 1, key: "L10N_SEARCH_BY_RATING", type: "ratings" },
                { index: 2, key: "L10N_SEARCH_BY_CATEGORY", type: "categories" },
                { index: 3, key: "L10N_SEARCH_BY_SERIES", type: "series" },
                { index: 4, key: "L10N_SEARCH_BY_YEAR", type: "years" },
                { index: 4, key: "L10N_SEARCH_BY_LANGUAGE", type: "languages" },
                { index: 4, key: "L10N_SEARCH_BY_VERSION", type: "versions" },
                { index: 4, key: "L10N_SEARCH_BY_MANUFACTURER", type: "manufacturers" }
            ]
        };
    }
}
