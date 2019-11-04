import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTreeModule } from '@angular/material/tree';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AbstractModule } from 'src/app/fwk/abstract-module';
import { MatPaginatorL10n } from '../providers/mat-paginator-l10n';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [
    MatToolbarModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatTableModule,
    MatTabsModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatExpansionModule,
    MatTooltipModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTreeModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatIconModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorL10n }
  ],
  exports: [
    MatToolbarModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatTableModule,
    MatTabsModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatExpansionModule,
    MatTooltipModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTreeModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatIconModule
  ]
})
export class MaterialModule extends AbstractModule {

  constructor() {
    super();
  }
}
