export class AbstractObject {

    constructor() {

    }

    protected _getLogger(): any {
        const that = this;
        return {
            debug(message: any) {
                console.debug(that._getClassName(), message);
            },
            info(message: any) {
                console.info(that._getClassName(), message);
            },
            error(message: any) {
                console.error(that._getClassName(), message);
            }
        }
    }

    private _getClassName() {
        return this.constructor.name;
    }
}
