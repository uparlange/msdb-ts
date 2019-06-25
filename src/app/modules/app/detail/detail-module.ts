import { AbstractModule } from '../../../fwk/abstract-module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../common/modules/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { DetailView } from './detail-view';
import { DetailModel } from './detail-model';
import { BiossetsView } from './biossets/biossets-view';

const routes: Routes = [
  { path: "", component: DetailView }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    DetailModel
  ],
  declarations: [
    DetailView,
    BiossetsView
  ],
  entryComponents: [
    BiossetsView
  ]
})
export class DetailModule extends AbstractModule {

  constructor() {
    super();
  }
}
