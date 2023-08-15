import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractAppComponent } from '../../abstract-app-component';
import { AppHelperObject } from '../../providers/app-helper-object';

@Component({
    selector: 'scrollable-tabs',
    templateUrl: './scrollable-tabs-component.html',
    styleUrls: ['./scrollable-tabs-component.css']
})
export class ScrollableTabsComponent extends AbstractAppComponent {
    @Input() tabs:Array<any> = new Array();
    selectedIndex = 0;
    abc: string = "";
    leftTabIdx = 0;
    atStart = true;
    atEnd = false
    @Output() emitSelectedTab = new EventEmitter()

    constructor(
        protected override _helper: AppHelperObject) {
        super(_helper);
    }

    override onInit() {
        this.emitSelectedTab.emit(this.tabs[0])
        this.abc = `translateX(0px)`
    }

    selectTab(index:number) {
        this.selectedIndex = index
        this.emitSelectedTab.emit(this.tabs[index])
        this.scrollTab(index - this.leftTabIdx - 1)
    }

    scrollTab(x:number) {
        if (this.atStart && x < 0 || this.atEnd && x > 0) {
            return
        }
        this.leftTabIdx = this.leftTabIdx + x
        this.abc = `translateX(${(this.leftTabIdx) * -140}px)`
        this.atStart = this.leftTabIdx === 0
        this.atEnd = this.leftTabIdx === this.tabs.length - 1
    }

}