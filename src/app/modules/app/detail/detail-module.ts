import { AbstractModule } from '../../../fwk/abstract-module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../common/modules/shared-module';
import { RouterModule, Routes } from '@angular/router';
import { DetailView } from './detail-view';
import { DetailModel } from './detail-model';
import { BiossetsPopup } from './biossets/biossets-popup';
import { ChipsPopup } from './chips/chips-popup';
import { ClonesPopup } from './clones/clones-popup';
import { DeviceRefsPopup } from './device-refs/device-refs-popup';
import { DipSwitchsPopup } from './dip-switchs/dip-switchs-popup';
import { DriverPopup } from './driver/driver-popup';
import { PortsPopup } from './ports/ports-popup';
import { RomsPopup } from './roms/roms-popup';

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
    BiossetsPopup,
    ChipsPopup,
    ClonesPopup,
    DeviceRefsPopup,
    DipSwitchsPopup,
    DriverPopup,
    PortsPopup,
    RomsPopup
  ],
  entryComponents: [
    BiossetsPopup,
    ChipsPopup,
    ClonesPopup,
    DeviceRefsPopup,
    DipSwitchsPopup,
    DriverPopup,
    PortsPopup,
    RomsPopup
  ]
})
export class DetailModule extends AbstractModule {

  constructor() {
    super();
  }
}
