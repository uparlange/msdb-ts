import { AbstractHelperObject } from './abstract-helper-object';
import { EventManager } from './managers/event-manager';
import { RouterManager } from './managers/router-manager';
import { CacheManager } from './managers/cache-manager';
import { TranslateManager } from './managers/translate-manager';
import { Subscription } from 'rxjs';
import { AbstractHelper } from './abstract-helper';

export class AbstractModel extends AbstractHelper {

  params: any = {};
  data: any = this._getInitData();
  needRefresh: boolean = true;

  private _connectionChangeSubscription: Subscription = null;

  constructor(AbstractHelperObject: AbstractHelperObject) {
    super(AbstractHelperObject);
    this.data = this._getInitData();
  }

  init(params: any) {
    this._connectionChangeSubscription = this._helper.getConnection().on("change").subscribe((online: boolean) => {
      this.params.online = online;
      if (online) {
        this.needRefresh = true;
        this._refresh();
      }
    });
    this.setTitle(null);
    this.setKeywords(null);
    const newParams = Object.assign({ online: this._helper.getConnection().online }, params);
    if (JSON.stringify(this.params) !== JSON.stringify(newParams)) {
      this.params = newParams;
      this.needRefresh = true;
    }
    this._init();
    this._refresh();
  }

  destroy() {
    this.onDestroy();
    this._connectionChangeSubscription.unsubscribe();
  }

  getEventBus(): EventManager {
    return this._helper.getEventBus();
  }

  getRouter(): RouterManager {
    return this._helper.getRouter();
  }

  getCache(): CacheManager {
    return this._helper.getCache();
  }

  getLabels(): TranslateManager {
    return this._helper.getLabels();
  }

  setTitle(value: string) {
    let title = "Mame Smart Database";
    if (typeof value === "string") {
      title += ` - ${value}`;
    }
    this._helper.getTitle().setTitle(title);
  }

  setKeywords(value: string): void {
    let content = "mame, mess, arcade, emulation, database, base de donnée, game, jeu";
    if (typeof value === "string") {
      content += `, ${value}`;
    }
    this._helper.getMeta().updateTag({
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

  protected _getInitData(): any {
    // need override
    return {};
  }
}
