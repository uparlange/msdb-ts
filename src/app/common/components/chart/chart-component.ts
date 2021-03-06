import { Component, ViewChild, ElementRef, Input, SimpleChanges } from '@angular/core';
import { AppHelperObject } from '../../providers/app-helper-object';
import Chart from 'chart.js';
import 'chartjs-plugin-labels';
import { AbstractAppComponent } from '../../abstract-app-component';

@Component({
    selector: "chart",
    templateUrl: './chart-component.html',
    styleUrls: ['./chart-component.css']
})
export class ChartComponent extends AbstractAppComponent {

    @Input() type: string = "bar";
    @Input() data: object = {};
    @Input() options: object = {};

    @ViewChild("canvas", { static: false })
    private _canvas: ElementRef;

    private _chart: Chart = null;

    constructor(
        protected _helper: AppHelperObject) {
        super(_helper);
    }

    afterViewInit(): void {
        super.afterViewInit();
        this._chart = new Chart(this._canvas.nativeElement, {
            type: this.type,
            data: this.data,
            options: this.options
        });
    }

    onChanges(changes: SimpleChanges): void {
        super.onChanges(changes);
        if (this._chart != null) {
            if (changes.data) {
                this._chart.data = this.data;
            }
            if (changes.options) {
                this._chart.options = this.options;
            }
            this._chart.update();
        }
    }

    onDestroy(): void {
        super.onDestroy();
        this._chart.destroy();
    }
}