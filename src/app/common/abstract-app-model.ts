import { AbstractModel } from '../fwk/abstract-model';
import { AbstractClassHelper } from '../fwk/abstract-class-helper';
import { MsdbProvider } from './msdb-provider';

export class AbstractAppModel extends AbstractModel {

    _provider: MsdbProvider = null;

    constructor(abstractClassHelper: AbstractClassHelper, provider: MsdbProvider) {
        super(abstractClassHelper);
        this._provider = provider;
    }

    getProvider(): MsdbProvider {
        return this._provider;
    }
}
