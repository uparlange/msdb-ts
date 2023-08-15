import { AbstractGuard } from '../fwk/abstract-guard';
import { ConfigProvider } from './providers/config-provider';
import { AppHelperObject } from './providers/app-helper-object';
import { AbstractHelperObject } from '../fwk/abstract-helper-object';

export class AbstractAppGuard extends AbstractGuard {

    constructor(
        protected override _helper: AbstractHelperObject) {
        super(_helper);
    }

    getConfigProvider(): ConfigProvider {
        return this._getHelper().getConfigProvider();
    }

    protected override _getHelper(): AppHelperObject {
        return <AppHelperObject>this._helper;
    }
}