import { AbstractGuard } from '../fwk/abstract-guard';
import { AppHelperObject } from './app-helper-object';
import { ConfigProvider } from './config-provider';

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