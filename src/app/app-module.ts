import { BrowserModule, HammerModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AbstractModule } from "src/app/fwk/abstract-module";
import { AppModel } from "./app-model";
import { ProgressBarDirective } from "./directives/progress-bar-directive";
import { AppView } from './app-view';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from './../environments/environment';
import { SharedModule } from './common/modules/shared-module';
import { HttpClientModule } from '@angular/common/http';
import { ClosableSnackBarComponent } from './components/closable-snack-bar-component/closable-snack-bar-component';

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
  { path: "notification", loadChildren: () => import("./modules/notification/notification-module").then(mod => mod.NotificationModule) },
  { path: "update", loadChildren: () => import("./modules/update/update-module").then(mod => mod.UpdateModule) },
  { path: "statistic", loadChildren: () => import("./modules/statistic/statistic-module").then(mod => mod.StatisticModule) },
  { path: "**", loadChildren: () => import("./modules/page-not-found/page-not-found-module").then(mod => mod.PageNotFoundModule) }
];

@NgModule({
  declarations: [
    AppView,
    ProgressBarDirective,
    ClosableSnackBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HammerModule,
    SharedModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: true }),
    ServiceWorkerModule.register("ngsw-worker.js", { enabled: environment.production })
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
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl(environment.assetsFolder + "/mdi.svg"));
    //matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl(environment.assetsFolder + "/flags.svg"));
  }

}
