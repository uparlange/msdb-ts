import { NgModule } from '@angular/core';
import { AbstractModule } from '../abstract-module';
import { TranslatePipe } from '../pipes/translate-pipe';

@NgModule({
    declarations: [
        TranslatePipe
    ],
    imports: [

    ],
    exports: [
        TranslatePipe
    ]
})
export class FwkSharedModule extends AbstractModule {

    constructor() {
        super();
    }
}