import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../../common/modules/shared-module";
import { AbstractModule } from "src/app/fwk/abstract-module";
import { AppModel } from "./app-model";
import { ProgressBarDirective } from "./progress-bar-directive";
import { AppView } from './app-view';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { FwkGlobalModule } from 'src/app/fwk/modules/fwk-global-module';
import { GlobalModule } from 'src/app/common/modules/global-module';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", loadChildren: () => import("./home/home-module").then(mod => mod.HomeModule) },
  { path: "search", loadChildren: () => import("./search/search-module").then(mod => mod.SearchModule) },
  { path: "result", loadChildren: () => import("./result/result-module").then(mod => mod.ResultModule) },
  { path: "detail", loadChildren: () => import("./detail/detail-module").then(mod => mod.DetailModule) },
  { path: "config", loadChildren: () => import("./config/config-module").then(mod => mod.ConfigModule) },
  { path: "history", loadChildren: () => import("./history/history-module").then(mod => mod.HistoryModule) },
  { path: "favorites", loadChildren: () => import("./favorites/favorites-module").then(mod => mod.FavoritesModule) }
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
    FwkGlobalModule,
    GlobalModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [
    AppModel
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
