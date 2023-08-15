import { Component, ViewChild, ElementRef, Input, SimpleChanges } from '@angular/core';
import { AppHelperObject } from '../../providers/app-helper-object';
import { Chart, PieController, ArcElement } from 'chart.js'
import { AbstractAppComponent } from '../../abstract-app-component';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(PieController, ArcElement, ChartDataLabels);

@Component({
    selector: "chart",
    templateUrl: './chart-component.html',
    styleUrls: ['./chart-component.css']
})
export class ChartComponent extends AbstractAppComponent {

    @Input() type: any = "bar";
    @Input() data: any = {};
    @Input() options: object = {};

    @ViewChild("canvas", { static: false })
    private _canvas!: ElementRef;

    private _chart!: Chart;

    constructor(
        protected override _helper: AppHelperObject) {
        super(_helper);
    }

    override afterViewInit(): void {
        super.afterViewInit();
        this._chart = new Chart(this._canvas.nativeElement, {
            type: this.type,
            data: this.data,
            options: this.options
        });
    }

    override onChanges(changes: SimpleChanges): void {
        super.onChanges(changes);
        if (this._chart != null) {
            if (changes['data']) {
                this._chart.data = this.data;
            }
            if (changes['options']) {
                this._chart.options = this.options;
            }
            this._chart.update();
        }
    }

    override onDestroy(): void {
        super.onDestroy();
        this._chart.destroy();
    }
}