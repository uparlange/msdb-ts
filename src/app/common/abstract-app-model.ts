import { AbstractModel } from '../fwk/abstract-model';
import { AbstractClassHelper } from '../fwk/abstract-class-helper';
import { MsdbProvider } from './msdb-provider';
import { HistoryManager } from './managers/history-manager';
import { AppClassHelper } from './app-class-helper';

export class AbstractAppModel extends AbstractModel {

  _provider: MsdbProvider = null;

  constructor(abstractClassHelper: AbstractClassHelper, provider: MsdbProvider) {
    super(abstractClassHelper);
    this._provider = provider;
  }

  getProvider(): MsdbProvider {
    return this._provider;
  }

  getHistory(): HistoryManager {
    return this._getHelper().getHistoryManager();
  }

  _getHelper(): AppClassHelper {
    return <AppClassHelper>this._helper;
  }
}
