import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { TranslatePipe } from '../../../fwk/pipes/translate.pipe';
import { AbstractModule } from 'src/app/fwk/abstract-module';
import { MatIconModule } from '@angular/material';
import { MatIconButtonDirective } from '../../directives/mat-icon-button-directive';
import { BlazyDirective } from '../../directives/blazy-directive';

@NgModule({
  declarations: [
    TranslatePipe,
    MatIconButtonDirective,
    BlazyDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    MatIconModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    MatIconModule,
    TranslatePipe,
    MatIconButtonDirective,
    BlazyDirective
  ]
})
export class SharedModule extends AbstractModule {

  constructor() {
    super();
  }

}