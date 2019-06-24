import { AbstractClass } from './abstract-class';
import { AbstractClassHelper } from './abstract-class-helper';
import { EventManager } from './managers/event-manager';
import { RouterManager } from './managers/router-manager';
import { CacheManager } from './managers/cache-manager';
import { TranslateManager } from './managers/translate-manager';
import { SocketManager } from '../common/managers/socket-manager';

export class AbstractModel extends AbstractClass {

  params: any = {};
  data: any = this._getInitData();

  _helper: AbstractClassHelper = null;
  _connectionChangeSubscriber: any = null;

  constructor(abstractClassHelper: AbstractClassHelper) {
    super();
    this._helper = abstractClassHelper;
    this.data = this._getInitData();
  }

  init(params: any) {
    this._connectionChangeSubscriber = this._helper.getConnection().on("change").subscribe((online) => {
      this.params.online = online;
      if (online) {
        this._callRefreshMethod(() => {
          this.getRouter().restoreScrollPosition();
        });
      }
    });
    this.setTitle(null);
    this.setKeywords(null);
    this.getRouter().restoreScrollPosition();
    const newParams = Object.assign({ online: this._helper.getConnection().online }, params);
    let paramsChanged = false;
    if (JSON.stringify(this.params) !== JSON.stringify(newParams)) {
      this.params = newParams;
      paramsChanged = true;
    }
    this._callInitMethod();
    if (paramsChanged) {
      this._callRefreshMethod(() => {
        this.getRouter().restoreScrollPosition();
      });
    }
  }

  destroy() {
    this._callDestroyMethod();
    this._connectionChangeSubscriber.unsubscribe();
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

  getGameIconUrl(game) {
    //return AppUtils.getGameIconUrl(game);
  }

  getGameVideoUrl(game) {
    //return AppUtils.getGameVideoUrl(game);
  }

  getGameManualUrl(game) {
    //return AppUtils.getGameManualUrl(game);
  }

  getGameSoundTrackUrl(game) {
    //return AppUtils.getGameSoundTrackUrl(game);
  }

  getGameFolder(game) {
    //return AppUtils.getGameFolder(game);
  }

  getSizeLabel(value: number): string {
    return this._getUnitLabel(value, ["B", "KiB", "MiB", "GiB"], 1024);
  }

  getFrequencyLabel(value: number): string {
    return this._getUnitLabel(value, ["Hz", "kHz", "MHz", "GHz"], 1000);
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

  onRefresh(callback: Function) {
    // need override
  }

  onDestroy(): void {
    // need override
  }

  _getUnitLabel(value: number, steps: Array<string>, stepMultiplier: number): string {
    let step = null;
    steps.forEach((item, index) => {
      const stepValue = Math.pow(stepMultiplier, index);
      if (value >= stepValue) {
        step = { unit: item, value: stepValue };
      }
      else {
        return;
      }
    });
    return `${Math.round(value / step.value * 100) / 100} ${step.unit}`;
  }

  _callInitMethod(): void {
    //this.getLogger().debug("onInit");
    this.onInit();
  }

  _callRefreshMethod(callback: Function): void {
    //this.getLogger().debug("onRefresh");
    this.onRefresh(callback);
  }

  _callDestroyMethod(): void {
    //this.getLogger().debug("onDestroy");
    this.onDestroy();
  }

  _getInitData(): any {
    // need override
    return {};
  }
}
