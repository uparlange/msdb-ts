export interface ILogger {

    debug(message: string): void;
    info(message: string): void;
    error(message: string): void;
}

export class AbstractObject {

    constructor() {

    }

    protected _getLogger(): ILogger {
        const that = this;
        return {
            debug(message: string): void {
                console.debug(that._getClassName(), message);
            },
            info(message: string): void {
                console.info(that._getClassName(), message);
            },
            error(message: string): void {
                console.error(that._getClassName(), message);
            }
        }
    }

    private _getClassName() {
        return this.constructor.name;
    }
}
