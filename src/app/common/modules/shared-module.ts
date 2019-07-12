import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material-module';
import { AbstractModule } from 'src/app/fwk/abstract-module';
import { MatIconModule } from '@angular/material';
import { MatIconButtonDirective } from '../directives/mat-icon-button-directive';
import { BlazyDirective } from '../directives/blazy-directive';
import { NgForItemComponent } from '../components/ng-for-item/ng-for-item-component';
import { FwkSharedModule } from 'src/app/fwk/modules/fwk-shared-module';

@NgModule({
  declarations: [
    MatIconButtonDirective,
    BlazyDirective,
    NgForItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    MatIconModule,
    FwkSharedModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    MatIconModule,
    FwkSharedModule,
    MatIconButtonDirective,
    BlazyDirective,
    NgForItemComponent
  ]
})
export class SharedModule extends AbstractModule {

  constructor() {
    super();
  }

}
