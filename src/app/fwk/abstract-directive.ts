import { OnChanges, OnInit, DoCheck, OnDestroy, SimpleChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked } from '@angular/core';
import { AbstractClass } from './abstract-class';
import { AbstractClassHelper } from './abstract-class-helper';
import { EventManager } from './managers/event-manager';
import { RouterManager } from './managers/router-manager';
import { ConnectionManager } from './managers/connection-manager';
import { TranslateManager } from './managers/translate-manager';
import { WindowRef } from './window-ref';
import { PopupManager } from './managers/popup-manager';

export class AbstractDirective extends AbstractClass implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  _helper: AbstractClassHelper = null;

  constructor(abstractClassHelper: AbstractClassHelper) {
    super();
    this._helper = abstractClassHelper;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.onChanges(changes);
  }

  ngOnInit(): void {
    //this.getLogger().debug("onInit");
    this.onInit();
  }

  ngDoCheck(): void {
    //this.getLogger().debug("doCheck");
    this.doCheck();
  }

  ngAfterContentInit(): void {
    //this.getLogger().debug("afterContentInit");
    this.afterContentInit();
  }

  ngAfterContentChecked(): void {
    //this.getLogger().debug("afterContentChecked");
    this.afterContentChecked();
  }

  ngAfterViewInit(): void {
    //this.getLogger().debug("afterViewInit");
    this.afterViewInit();
  }

  ngAfterViewChecked(): void {
    //this.getLogger().debug("afterViewChecked");
    this.afterViewChecked();
  }

  ngOnDestroy(): void {
    //this.getLogger().debug("onDestroy");
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
