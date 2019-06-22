import { Component, EventEmitter } from '@angular/core';
import { AbstractComponent } from '../../../fwk/abstract-component';
import { AppClassHelper } from '../../app-class-helper';

@Component({
  selector: "ngForItem",
  inputs: ["last"],
  outputs: ["onLast"],
  templateUrl: './ng-for-item-component.html',
  styleUrls: ['./ng-for-item-component.css']
})
export class NgForItemComponent extends AbstractComponent {

  onLast: EventEmitter<any> = new EventEmitter();
  last: boolean = false;

  constructor(appClassHelper: AppClassHelper) {
    super(appClassHelper);
  }

  afterContentInit(): void {
    super.afterContentInit();
    if (this.last) {
      this.onLast.emit();
    }
  }
}
