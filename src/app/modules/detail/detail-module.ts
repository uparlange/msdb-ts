import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailView } from './detail-view';
import { DetailModel } from './detail-model';
import { BiossetsPopup } from './popups/biossets/biossets-popup';
import { ChipsPopup } from './popups/chips/chips-popup';
import { ClonesPopup } from './popups/clones/clones-popup';
import { DeviceRefsPopup } from './popups/device-refs/device-refs-popup';
import { DipSwitchsPopup } from './popups/dip-switchs/dip-switchs-popup';
import { DriverPopup } from './popups/driver/driver-popup';
import { PortsPopup } from './popups/ports/ports-popup';
import { RomsPopup } from './popups/roms/roms-popup';
import { SharedModule } from 'src/app/common/modules/shared-module';
import { AbstractModule } from 'src/app/fwk/abstract-module';

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
    RomsPopup,
  ]
})
export class DetailModule extends AbstractModule {

  constructor() {
    super();
  }
}
