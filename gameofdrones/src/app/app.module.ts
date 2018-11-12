import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import * as shared from '../modules/shared/module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { gameReducer } from 'src/modules/reducers/game';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: 'game',
    loadChildren: './game/module#GameAppModule'
  },
  {
    path: '',
    redirectTo: 'game',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/error?code=notfound',
  },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      routes,
      {
        useHash: true,
        preloadingStrategy: PreloadAllModules,
        // enableTracing: true,
      }
    ),
    StoreModule.forRoot({
      game: gameReducer
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    shared.SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
