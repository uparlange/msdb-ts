import { BrowserModule, HammerModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AbstractModule } from "src/app/fwk/abstract-module";
import { AppModel } from "./app-model";
import { ProgressBarDirective } from "./directives/progress-bar-directive";
import { AppView } from './app-view';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { FwkGlobalModule } from 'src/app/fwk/modules/fwk-global-module';
import { GlobalModule } from 'src/app/common/modules/global-module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from './../environments/environment';
import { SharedModule } from './common/modules/shared-module';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", loadChildren: () => import("./modules/home/home-module").then(mod => mod.HomeModule) },
  { path: "search", loadChildren: () => import("./modules/search/search-module").then(mod => mod.SearchModule) },
  { path: "result", loadChildren: () => import("./modules/result/result-module").then(mod => mod.ResultModule) },
  { path: "detail", loadChildren: () => import("./modules/detail/detail-module").then(mod => mod.DetailModule) },
  { path: "config", loadChildren: () => import("./modules/config/config-module").then(mod => mod.ConfigModule) },
  { path: "history", loadChildren: () => import("./modules/history/history-module").then(mod => mod.HistoryModule) },
  { path: "favorites", loadChildren: () => import("./modules/favorites/favorites-module").then(mod => mod.FavoritesModule) },
  { path: "mygames", loadChildren: () => import("./modules/my-games/my-games-module").then(mod => mod.MyGamesModule) },
  { path: "**", loadChildren: () => import("./modules/page-not-found/page-not-found-module").then(mod => mod.PageNotFoundModule) }
];

@NgModule({
  declarations: [
    AppView,
    ProgressBarDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HammerModule,
    SharedModule,
    FwkGlobalModule,
    GlobalModule,
    RouterModule.forRoot(routes, { useHash: true }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
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
