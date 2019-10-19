import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material-module';
import { AbstractModule } from 'src/app/fwk/abstract-module';
import { MatIconButtonDirective } from '../directives/mat-icon-button-directive';
import { BlazyDirective } from '../directives/blazy-directive';
import { NgForItemComponent } from '../components/ng-for-item/ng-for-item-component';
import { FwkSharedModule } from 'src/app/fwk/modules/fwk-shared-module';
import { AdvTableComponent } from '../components/adv-table/adv-table-component';
import { AdvTableColumnDirective } from '../components/adv-table/adv-table-column-directive';
import { ScrollToTopDirective } from '../directives/scroll-to-top-directive';

@NgModule({
  declarations: [
    MatIconButtonDirective,
    BlazyDirective,
    NgForItemComponent,
    AdvTableComponent,
    AdvTableColumnDirective,
    ScrollToTopDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    FwkSharedModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FwkSharedModule,
    MatIconButtonDirective,
    BlazyDirective,
    NgForItemComponent,
    AdvTableComponent,
    AdvTableColumnDirective,
    ScrollToTopDirective
  ]
})
export class SharedModule extends AbstractModule {

  constructor() {
    super();
  }

}
