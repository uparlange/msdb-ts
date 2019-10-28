import { AbstractGuard } from '../fwk/abstract-guard';
import { ConfigProvider } from './providers/config-provider';
import { AppHelperObject } from './providers/app-helper-object';

export class AbstractAppGuard extends AbstractGuard {

    constructor(appHelperObject: AppHelperObject) {
        super(appHelperObject);
    }

    getConfigProvider(): ConfigProvider {
        return this._getHelper().getConfigProvider();
    }

    _getHelper(): AppHelperObject {
        return <AppHelperObject>this._helper;
    }
}