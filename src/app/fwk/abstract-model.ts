import { EventManager } from './managers/event-manager';
import { RouterManager } from './managers/router-manager';
import { CacheManager } from './managers/cache-manager';
import { TranslateManager } from './managers/translate-manager';
import { Subscription } from 'rxjs';
import { AbstractHelper } from './abstract-helper';
import { FwkHelperObject } from './providers/fwk-helper-object';
import { AbstractHelperObject } from './abstract-helper-object';

export class AbstractModel extends AbstractHelper {

  params: any = {};
  data: any = this._getInitData();
  needRefresh: boolean = true;
  active: boolean = false;

  private _connectionChangeSubscription: Subscription = null;

  constructor(
    protected _helper: AbstractHelperObject) {
    super(_helper);
    this.data = this._getInitData();
  }

  init(params: any) {
    this._connectionChangeSubscription = this._getHelper().getConnection().on("change").subscribe((online: boolean) => {
      this.params.online = online;
      if (online) {
        this.needRefresh = true;
        this._refresh();
      }
    });
    this.setTitle(null);
    this.setKeywords(null);
    const newParams = Object.assign({ online: this._getHelper().getConnection().online }, params);
    if (JSON.stringify(this.params) !== JSON.stringify(newParams)) {
      this.params = newParams;
      this.needRefresh = true;
    }
    this.active = true;
    this._init();
    this._refresh();
  }

  destroy() {
    this.onDestroy();
    this._connectionChangeSubscription.unsubscribe();
    this.active = false;
  }

  getEventBus(): EventManager {
    return this._getHelper().getEventBus();
  }

  getRouter(): RouterManager {
    return this._getHelper().getRouter();
  }

  getCache(): CacheManager {
    return this._getHelper().getCache();
  }

  getLabels(): TranslateManager {
    return this._getHelper().getLabels();
  }

  setTitle(value: string) {
    let title = "MAME Smart Database";
    if (typeof value === "string") {
      title += ` - ${value}`;
    }
    this._getHelper().getTitle().setTitle(title);
  }

  setKeywords(value: string): void {
    let content = "mame, mess, arcade, emulation, database, base de donnée, game, jeu";
    if (typeof value === "string") {
      content += `, ${value}`;
    }
    this._getHelper().getMeta().updateTag({
      content: content,
      name: "keywords"
    });
  }

  onInit(): void {
    // need override
  }

  onRefresh(callback: Function): void {
    // need override
  }

  onDestroy(): void {
    // need override
  }

  private _init(): void {
    this.onInit();
    this.getRouter().restoreScrollPosition();
  }

  private _refresh(): void {
    if (this.needRefresh) {
      this.needRefresh = false;
      this.onRefresh(() => {
        this.getRouter().restoreScrollPosition();
      });
    }
  }

  protected _getHelper(): FwkHelperObject {
    return <FwkHelperObject>this._helper;
  }

  protected _getInitData(): any {
    // need override
    return {};
  }
}
