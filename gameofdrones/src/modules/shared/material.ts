import { NgModule } from '@angular/core';

import * as cdk from '@angular/cdk/table';

import * as material from '@angular/material';


@NgModule({
  exports: [
    cdk.CdkTableModule,
    material.MatAutocompleteModule,
    material.MatButtonModule,
    material.MatButtonToggleModule,
    material.MatCardModule,
    material.MatCheckboxModule,
    material.MatChipsModule,
    material.MatDatepickerModule,
    material.MatDialogModule,
    material.MatIconModule,
    material.MatInputModule,
    material.MatListModule,
    material.MatMenuModule,
    material.MatNativeDateModule,
    material.MatProgressBarModule,
    material.MatProgressSpinnerModule,
    material.MatRadioModule,
    material.MatSelectModule,
    material.MatTooltipModule,
    material.MatSidenavModule,
    material.MatSlideToggleModule,
    material.MatSnackBarModule,
    material.MatTabsModule,
    material.MatToolbarModule,
    material.MatTooltipModule,
    material.MatGridListModule,
    material.MatSliderModule,
    material.MatExpansionModule
  ]
})

export class MaterialModule { }
