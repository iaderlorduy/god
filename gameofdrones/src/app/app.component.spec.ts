import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import * as shared from '../modules/shared/module';
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
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        shared.SharedModule,
        RouterModule.forRoot(
          routes,
          {
            useHash: true,
            preloadingStrategy: PreloadAllModules,
            // enableTracing: true,
          }
        ),
      ]
    }).compileComponents();
  }));
  it(`should have as title 'GAMES OF DRONES'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('GAMES OF DRONES');
  }));
  it('should render title in a span tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('span').textContent).toContain('GAMES OF DRONES');
  }));
});
