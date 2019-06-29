import { OnChanges, OnInit, DoCheck, OnDestroy, SimpleChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked } from '@angular/core';
import { AbstractHelperObject } from './abstract-helper-object';
import { EventManager } from './managers/event-manager';
import { RouterManager } from './managers/router-manager';
import { ConnectionManager } from './managers/connection-manager';
import { TranslateManager } from './managers/translate-manager';
import { WindowRef } from './window-ref';
import { PopupManager } from './managers/popup-manager';
import { AbstractHelper } from './abstract-helper';

export class AbstractDirective extends AbstractHelper implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  constructor(AbstractHelperObject: AbstractHelperObject) {
    super(AbstractHelperObject);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.onChanges(changes);
  }

  ngOnInit(): void {
    this.onInit();
  }

  ngDoCheck(): void {
    this.doCheck();
  }

  ngAfterContentInit(): void {
    this.afterContentInit();
  }

  ngAfterContentChecked(): void {
    this.afterContentChecked();
  }

  ngAfterViewInit(): void {
    this.afterViewInit();
  }

  ngAfterViewChecked(): void {
    this.afterViewChecked();
  }

  ngOnDestroy(): void {
    this.onDestroy();
  }

  onChanges(changes: SimpleChanges): void {
    // need override
  }

  onInit(): void {
    // need override
  }

  doCheck(): void {
    // need override
  }

  afterContentInit(): void {
    // need override
  }

  afterContentChecked(): void {
    // need override
  }

  afterViewInit(): void {
    // need override
  }

  afterViewChecked(): void {
    // need override
  }

  onDestroy(): void {
    // need override
  }

  getRouter(): RouterManager {
    return this._helper.getRouter();
  }

  getConnection(): ConnectionManager {
    return this._helper.getConnection();
  }

  getLabels(): TranslateManager {
    return this._helper.getLabels();
  }

  getWindowRef(): WindowRef {
    return this._helper.getWindowRef();
  }

  getEventBus(): EventManager {
    return this._helper.getEventBus();
  }

  getPopups(): PopupManager {
    return this._helper.getPopups();
  }
}
