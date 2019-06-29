import { NgModule } from '@angular/core';
import { AbstractModule } from '../abstract-module';
import { TranslatePipe } from '../pipes/translate-pipe';
import { LinkDirective } from '../directives/link-directive';

@NgModule({
    declarations: [
        TranslatePipe,
        LinkDirective
    ],
    exports: [
        TranslatePipe,
        LinkDirective
    ]
})
export class FwkSharedModule extends AbstractModule {

    constructor() {
        super();
    }
}