import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractComponent } from '../../../fwk/abstract-component';
import { AppHelperObject } from '../../providers/app-helper-object';

@Component({
  selector: "ngForItem",
  templateUrl: './ng-for-item-component.html',
  styleUrls: ['./ng-for-item-component.css']
})
export class NgForItemComponent extends AbstractComponent {

  @Input() last: boolean = false;

  @Output() onLast: EventEmitter<any> = new EventEmitter();

  constructor(
    protected _helper: AppHelperObject) {
    super(_helper);
  }

  afterContentInit(): void {
    super.afterContentInit();
    if (this.last) {
      this.onLast.emit();
    }
  }
}
