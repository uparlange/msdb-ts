export class AbstractObject {

    constructor() {

    }

    getLogger(): any {
        const that = this;
        return {
            debug(message: any) {
                console.debug(that.getClassName(), message);
            },
            info(message: any) {
                console.info(that.getClassName(), message);
            },
            error(message: any) {
                console.error(that.getClassName(), message);
            }
        }
    }

    getClassName() {
        return this.constructor.name;
    }
}
