import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material-module';
import { AbstractModule } from '../../fwk/abstract-module';
import { MatIconButtonDirective } from '../directives/mat-icon-button-directive';
import { BlazyDirective } from '../directives/blazy-directive';
import { NgForItemComponent } from '../components/ng-for-item/ng-for-item-component';
import { FwkSharedModule } from '../../fwk/modules/fwk-shared-module';
import { AdvTableComponent } from '../components/adv-table/adv-table-component';
import { AdvTableColumnDirective } from '../components/adv-table/adv-table-column-directive';
import { ScrollToTopDirective } from '../directives/scroll-to-top-directive';
import { GalleryComponent } from '../components/gallery/gallery-component';
import { ChartComponent } from '../components/chart/chart-component';
import { StarRatingComponent } from '../components/star-rating/star-rating-component';
import { AutoFocusDirective } from '../directives/auto-focus-directive';
import { ScrollableTabsComponent } from '../components/scrollable-tabs/scrollable-tabs-component'

@NgModule({
  declarations: [
    MatIconButtonDirective,
    BlazyDirective,
    NgForItemComponent,
    AdvTableComponent,
    AdvTableColumnDirective,
    ScrollToTopDirective,
    GalleryComponent,
    ChartComponent,
    StarRatingComponent,
    AutoFocusDirective,
    ScrollableTabsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
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
    ScrollToTopDirective,
    GalleryComponent,
    ChartComponent,
    StarRatingComponent,
    AutoFocusDirective,
    ScrollableTabsComponent
  ]
})
export class SharedModule extends AbstractModule {

  constructor() {
    super();
  }

}
