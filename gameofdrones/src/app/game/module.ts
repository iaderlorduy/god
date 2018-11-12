import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../modules/shared/module';
import * as services from '../../modules/services/module';
import { GameAppComponent } from './app';
import { StepperComponent } from './stepper/stepper';
import { HistoryComponent } from './history/history';

const gameRoutes: Routes = [
  {
    path: '',
    component: GameAppComponent,
    children: [
      { path: '', component: StepperComponent },
      { path: 'history', component: HistoryComponent }
    ]
  }
];

@NgModule({
  declarations: [
    GameAppComponent,
    StepperComponent, 
    HistoryComponent
  ],
  imports: [
    RouterModule.forChild(gameRoutes),
    SharedModule,
    services.ServiceModule
  ],
  exports: [
  ],
  providers: [
  ],
  entryComponents: [
  ]
})

export class GameAppModule { }
