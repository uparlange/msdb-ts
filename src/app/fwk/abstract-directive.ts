import { OnChanges, OnInit, DoCheck, OnDestroy, SimpleChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, Directive } from '@angular/core';
import { EventManager } from './managers/event-manager';
import { RouterManager } from './managers/router-manager';
import { ConnectionManager } from './managers/connection-manager';
import { TranslateManager } from './managers/translate-manager';
import { PopupManager } from './managers/popup-manager';
import { AbstractHelper } from './abstract-helper';
import { WindowRef } from './providers/window-ref';
import { AbstractHelperObject } from './abstract-helper-object';
import { FwkHelperObject } from './providers/fwk-helper-object';

@Directive()
export class AbstractDirective extends AbstractHelper implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  constructor(
    protected _helper: AbstractHelperObject) {
    super(_helper);
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
    return this._getHelper().getRouter();
  }

  getConnection(): ConnectionManager {
    return this._getHelper().getConnection();
  }

  getLabels(): TranslateManager {
    return this._getHelper().getLabels();
  }

  getWindowRef(): WindowRef {
    return this._getHelper().getWindowRef();
  }

  getEventBus(): EventManager {
    return this._getHelper().getEventBus();
  }

  getPopups(): PopupManager {
    return this._getHelper().getPopups();
  }

  protected _getHelper(): FwkHelperObject {
    return <FwkHelperObject>this._helper;
  }
}
