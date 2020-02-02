import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { Injectable } from '@angular/core';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';
import { environment } from 'src/environments/environment';

@Injectable()
export class NwjsModel extends AbstractAppModel {

    constructor(
        protected _helper: AppHelperObject) {
        super(_helper);
    }

    onInit(): void {
        super.onInit();
        //this._initFfmpegHashes();
    }

    private _initFfmpegHashes(): void {
        const fs = window.nw.require("fs");
        const path = window.nw.require("path");
        const nwPath = window.nw.process.execPath;
        const nwDir = path.dirname(nwPath);
        this.data.ffmpegHash = this._getHash(fs.readFileSync(nwDir + "/ffmpeg.dll", "utf8"));
        this.data.ffmpegPatchedHash = this._getHash(fs.readFileSync(environment.assetsFolder + "/nwjs/ffmpeg.dll", "utf8"));
    }

    private _getHash(data: string): string {
        const crypto = window.nw.require("crypto");
        return crypto.createHash("md5").update(data).digest("hex");
    }

    protected _getInitData(): any {
        return {
            ffmpegHash: "",
            ffmpegPatchedHash: ""
        };
    }
}