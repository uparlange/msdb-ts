import { Injectable } from '@angular/core';
import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';

@Injectable()
export class HomeModel extends AbstractAppModel {

    constructor(appHelperObject: AppHelperObject) {
        super(appHelperObject);
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
                }
                callback();
            });
        }
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
            }
        };
    }
}
