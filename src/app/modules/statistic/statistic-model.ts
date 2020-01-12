import { Injectable } from '@angular/core';
import { AbstractAppModel } from 'src/app/common/abstract-app-model';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';

@Injectable()
export class StatisticModel extends AbstractAppModel {

    constructor(
        protected _helper: AppHelperObject) {
        super(_helper);
    }

    onRefresh(callback: Function): void {
        super.onRefresh(callback);
        this.getMsdbProvider().getMameInfos().subscribe((data: any) => {
            if (data !== null) {
                this.data.mame = data;
                this._initChart();
                callback();
            } else {
                callback();
            }

        });
    }

    private _initChart(): void {
        this.data.data.global1 = {
            datasets: [{
                data: [this.data.mame.parentCount, this.data.mame.cloneCount],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                ]
            }],
            labels: ["Parent", "Clone"]
        }
        const global2OtherCount = this.data.mame.machineCount - this.data.mame.biosCount - this.data.mame.deviceCount - this.data.mame.mechanicalCount;
        this.data.data.global2 = {
            datasets: [{
                data: [this.data.mame.biosCount, this.data.mame.deviceCount, this.data.mame.mechanicalCount, global2OtherCount],
                backgroundColor: [
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ]
            }],
            labels: ["Bios", "Device", "Mechanical", "Games & Systems"]
        }
        this.data.data.mame1 = {
            datasets: [{
                data: [this.data.mame.mameParentCount, this.data.mame.mameCloneCount],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                ]
            }],
            labels: ["Parent", "Clone"]
        }
        const mame2OtherCount = this.data.mame.mameCount - this.data.mame.mameBiosCount - this.data.mame.mameDeviceCount - this.data.mame.mameMechanicalCount;
        this.data.data.mame2 = {
            datasets: [{
                data: [this.data.mame.mameBiosCount, this.data.mame.mameDeviceCount, this.data.mame.mameMechanicalCount, mame2OtherCount],
                backgroundColor: [
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ]
            }],
            labels: ["Bios", "Device", "Mechanical", "Games"]
        }
        this.data.data.mess1 = {
            datasets: [{
                data: [this.data.mame.messParentCount, this.data.mame.messCloneCount],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                ]
            }],
            labels: ["Parent", "Clone"]
        }
        const mess2OtherCount = this.data.mame.messCount - this.data.mame.messBiosCount - this.data.mame.messDeviceCount - this.data.mame.messMechanicalCount;
        this.data.data.mess2 = {
            datasets: [{
                data: [this.data.mame.messBiosCount, this.data.mame.messDeviceCount, this.data.mame.messMechanicalCount, mess2OtherCount],
                backgroundColor: [
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ]
            }],
            labels: ["Bios", "Device", "Mechanical", "Systems"]
        }
    }

    protected _getInitData(): any {
        return {
            mame: {},
            type: "pie",
            data: {
                global1: {},
                global2: {},
                mame1: {},
                mame2: {},
                mess1: {},
                mess2: {},
            },
            options: {
                circumference: Math.PI,
                rotation: -Math.PI,
                cutoutPercentage: 50,
                legend: {
                    display: false
                },
                plugins: {
                    labels: [
                        {
                            render: "value"
                        },
                        {
                            render: "label",
                            position: "outside",
                            arc: true
                        }
                    ]
                }
            }
        };
    }
}