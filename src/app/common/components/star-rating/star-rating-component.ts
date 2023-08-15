import { Component, Input } from '@angular/core';
import { AppHelperObject } from '../../providers/app-helper-object';
import { AbstractAppComponent } from '../../abstract-app-component';

@Component({
    selector: "star-rating",
    templateUrl: './star-rating-component.html',
    styleUrls: ['./star-rating-component.css']
})
export class StarRatingComponent extends AbstractAppComponent {

    @Input() value: number = 0;
    @Input() size: number = 3;

    constructor(
        protected override _helper: AppHelperObject) {
        super(_helper);
    }

    toArray(value: number) {
        return Array(value);
    }

    getIcon(index: number) {
        const result = this.value - index;
        let iconType = "star";
        if (result >= 1) {
            iconType = "starFull";
        } else if (result == 0.5) {
            iconType = "starHalf"
        }
        return this.getMdiIconByType(iconType);
    }
}