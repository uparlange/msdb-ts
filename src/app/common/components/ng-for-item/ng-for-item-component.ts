import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppHelperObject } from '../../providers/app-helper-object';
import { AbstractAppComponent } from '../../abstract-app-component';

@Component({
  selector: "ngForItem",
  templateUrl: './ng-for-item-component.html',
  styleUrls: ['./ng-for-item-component.css']
})
export class NgForItemComponent extends AbstractAppComponent {

  @Input() last: boolean = false;

  @Output() onLast: EventEmitter<any> = new EventEmitter();

  constructor(
    protected override _helper: AppHelperObject) {
    super(_helper);
  }

  override afterContentInit(): void {
    super.afterContentInit();
    if (this.last) {
      this.onLast.emit();
    }
  }
}
