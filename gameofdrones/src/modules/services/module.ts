import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpModule } from '@angular/http';

import { RouterModule } from '@angular/router';

import { GameService } from './game';
export { GameService } from './game';

import { InterceptorClass, ErrorServiceToast } from './shared/interceptors'
import { MaterialModule } from '../shared/material';

const interceptors = { provide: HTTP_INTERCEPTORS, useClass: InterceptorClass, multi: true };

@NgModule({
  declarations: [
    ErrorServiceToast
  ],
  imports: [
    HttpClientModule,
    HttpModule,
    MaterialModule
  ],
  exports: [
  ],
  providers: [
    interceptors,
    GameService,
  ],
  entryComponents: [
    ErrorServiceToast
  ]
})
export class ServiceModule { }
