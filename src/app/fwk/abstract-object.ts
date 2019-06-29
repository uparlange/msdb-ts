export class AbstractObject {

    constructor() {

    }

    getLogger(): any {
        const that = this;
        return {
            debug(message: string) {
                console.debug(that.getClassName(), message);
            },
            info(message: string) {
                console.info(that.getClassName(), message);
            }
        }
    }

    getClassName() {
        return this.constructor.name;
    }
}
