import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, isDevMode } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppModel } from "./app-model";
import { ProgressBarDirective } from "./directives/progress-bar-directive";
import { AppView } from './app-view';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from './../environments/environment';
import { SharedModule } from './common/modules/shared-module';
import { HttpClientModule } from '@angular/common/http';
import { AbstractModule } from "./fwk/abstract-module";
import { CustomSnackBarComponent } from "./components/custom-snack-bar/custom-snack-bar-component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", loadChildren: () => import("./modules/home/home-module").then(mod => mod.HomeModule) },
  { path: "search", loadChildren: () => import("./modules/search/search-module").then(mod => mod.SearchModule) },
  { path: "result", loadChildren: () => import("./modules/result/result-module").then(mod => mod.ResultModule) },
  { path: "detail", loadChildren: () => import("./modules/detail/detail-module").then(mod => mod.DetailModule) },
  { path: "history", loadChildren: () => import("./modules/history/history-module").then(mod => mod.HistoryModule) },
  { path: "favorites", loadChildren: () => import("./modules/favorites/favorites-module").then(mod => mod.FavoritesModule) },
  { path: "notification", loadChildren: () => import("./modules/notification/notification-module").then(mod => mod.NotificationModule) },
  { path: "statistic", loadChildren: () => import("./modules/statistic/statistic-module").then(mod => mod.StatisticModule) },
  { path: "**", loadChildren: () => import("./modules/page-not-found/page-not-found-module").then(mod => mod.PageNotFoundModule) }
];

@NgModule({
  declarations: [
    AppView,
    ProgressBarDirective,
    CustomSnackBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: true }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
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
