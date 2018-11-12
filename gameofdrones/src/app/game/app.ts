import { Component } from '@angular/core';

@Component({
  selector: 'game-app',
  template: `   
      <div>
        <router-outlet></router-outlet>
      </div>
    `
})
export class GameAppComponent { }
