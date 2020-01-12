import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from '@angular/core';
import { AppHelperObject } from './app-helper-object';

@Injectable({ providedIn: "root" })
export class MatPaginatorL10n extends MatPaginatorIntl {

    constructor(
        private _helper: AppHelperObject) {
        super();
        this._refreshTranslation();
        this._getLabels().on("languageChange").subscribe(() => {
            this._refreshTranslation();
        });
        this.getRangeLabel = function (page: number, pageSize: number, length: number) {
            if (length == 0 || pageSize == 0) {
                return `0 / ${length}`;
            }
            length = Math.max(length, 0);
            const startIndex = page * pageSize;
            const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
            return `${(startIndex + 1)}...${endIndex} / ${length}`;
        }
    }

    private _refreshTranslation() {
        this._getLabels().getValues(["L10N_FIRST_PAGE", "L10N_LAST_PAGE", "L10N_NEXT_PAGE", "L10N_PREVIOUS_PAGE", "L10N_ITEMS_PER_PAGE"]).subscribe((translations) => {
            this.firstPageLabel = translations.L10N_FIRST_PAGE;
            this.itemsPerPageLabel = translations.L10N_ITEMS_PER_PAGE;
            this.lastPageLabel = translations.L10N_LAST_PAGE;
            this.nextPageLabel = translations.L10N_NEXT_PAGE;
            this.previousPageLabel = translations.L10N_PREVIOUS_PAGE;
        });
    }

    private _getLabels() {
        return this._helper.getLabels();
    }
}