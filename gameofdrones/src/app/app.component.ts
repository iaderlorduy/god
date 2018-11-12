import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <mat-toolbar color="primary">
      <mat-toolbar-row>
        <span>{{ title }}</span> 
      </mat-toolbar-row>
  </mat-toolbar>
  <router-outlet></router-outlet>
  `,
  styles:[`
    mat-toolbar, mat-toolbar-row {
      min-height: 48px;
      height: 48px;
    }
  `]
})
export class AppComponent {
  title = 'GAMES OF DRONES';
}
