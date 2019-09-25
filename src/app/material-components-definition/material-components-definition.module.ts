import { NgModule } from '@angular/core';
import {MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatTableModule,
  MatInputModule,
  MatTooltipModule,
  MatDialogModule,
  MatProgressBarModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatGridListModule,
  MatTabsModule,
  MatMenuModule,
  MatSelectModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatIconModule} from '@angular/material';


@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatTableModule,
    MatTooltipModule,
    MatIconModule,
    MatDialogModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatTabsModule,
    MatMenuModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSnackBarModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatTooltipModule,
    MatIconModule,
    MatDialogModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatTabsModule,
    MatMenuModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSnackBarModule
  ]
})
export class MaterialComponentsDefinitionModule { }
