import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../../common/modules/shared/shared.module";
import { AbstractModule } from "src/app/fwk/abstract-module";
import { FwkModule } from "src/app/fwk/modules/fwk-module";
import { AppModel } from "./app-model";
import { ProgressBarDirective } from "./progress-bar-directive";
import { AppView } from './app-view';
import { MsdbProvider } from 'src/app/common/msdb-provider';
import { ConfigProvider } from 'src/app/common/config-provider';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AppClassHelper } from 'src/app/common/app-class-helper';
import { AppShell } from 'src/app/common/app-shell';
import { AnalyticsManager } from 'src/app/common/managers/analytics-manager';
import { BlazyManager } from 'src/app/common/managers/blazy-Manager';
import { HistoryManager } from '../../common/managers/history-manager';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", loadChildren: () => import("./home/home-module").then(mod => mod.HomeModule) },
  { path: "search", loadChildren: () => import("./search/search-module").then(mod => mod.SearchModule) },
  { path: "result", loadChildren: () => import("./result/result-module").then(mod => mod.ResultModule) },
  { path: "detail", loadChildren: () => import("./detail/detail-module").then(mod => mod.DetailModule) }
];

@NgModule({
  declarations: [
    AppView,
    ProgressBarDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    FwkModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [
    AppModel,
    MsdbProvider,
    ConfigProvider,
    AppShell,
    AppClassHelper,
    AnalyticsManager,
    BlazyManager,
    HistoryManager
  ],
  bootstrap: [
    AppView
  ]
})
export class AppModule extends AbstractModule {

  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    super();
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'));
  }

}
