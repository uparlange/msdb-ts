import { AbstractObject } from 'src/app/fwk/abstract-object';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: "root" })
export class IconProvider extends AbstractObject {

    private _typeMdiIcon: object = {
        adult: "account-lock-outline",
        bios: "chip",
        category: "folder-outline",
        categories: "folder-outline",
        changelog: "radar",
        close: "close",
        delete: "close",
        description: "form-textbox",
        device: "devices",
        download: "download",
        language: "flag-outline",
        languages: "flag-outline",
        manufacturer: "domain",
        manufacturers: "domain",
        mechanical: "slot-machine-outline",
        mess: "desktop-classic",
        rating: "star-circle-outline",
        ratings: "star-circle-outline",
        search: "magnify",
        series: "format-list-bulleted",
        version: "numeric-positive-1",
        versions: "numeric-positive-1",
        year: "calendar",
        years: "calendar",
        menu: "menu",
        favorites: "heart-outline",
        addFavory: "heart-outline",
        removeFavory: "heart-broken-outline",
        history: "history",
        statistic: "chart-arc",
        notification: "bell-outline",
        previousPage: "arrow-left-bold-circle-outline",
        scrollToTop: "arrow-up-bold-circle-outline",
        play: "gamepad-variant-outline",
        more: "plus-circle-outline",
        wifi: "wifi",
        wifiOff: "wifi-off",
        treeItem: "subdirectory-arrow-right",
        nodeOpened: "chevron-down",
        nodeClosed: "chevron-right",
        star: "star-outline",
        starHalf: "star-half",
        starFull: "star"
    }

    private _languageCoutryCode: object = {
        chinese: "cn",
        croatian: "hr",
        czech: "cz",
        dutch: "nl",
        english: "gb",
        french: "fr",
        german: "de",
        greek: "gr",
        hungarian: "hu",
        italian: "it",
        japanese: "jp",
        korean: "kr",
        polish: "pl",
        portuguese: "pt",
        russian: "ru",
        slovak: "sk",
        spanish: "es",
        swedish: "se",
        turkish: "tr",
        norwegian: "no",
        bulgarian: "bg",
        latvian: "lv",
        ukrainian: "ua",
        belgian: "be"
    }

    constructor() {
        super();
    }

    getMdiIconByType(type: string): string {
        let icon: string = this._typeMdiIcon[type];
        if (icon == null) {
            icon = "cloud-question";
        }
        return icon;
    }

    getCoutryCodeIconsByLanguage(language: string): Array<string> {
        const icons = [];
        const languages_array = language.toLowerCase().split("/");
        languages_array.forEach(language => {
            const code = this._languageCoutryCode[language];
            if (code != null) {
                icons.push({ data: environment.assetsFolder + "/flags.svg#flag-" + code });
            }
        });
        if (icons.length == 0) {
            icons.push({ data: "?" });
        }
        return icons;
    }

}