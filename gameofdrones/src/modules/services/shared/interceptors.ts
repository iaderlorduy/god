import { Injectable, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent, HttpHeaders } from '@angular/common/http';
import { MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material';

@Injectable()
export class InterceptorClass implements HttpInterceptor {

  constructor(
    public snackBar: MatSnackBar
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //intercepted request
    const authReq = req.clone({});
    return next.handle(authReq).catch((error, caught) => {
      this.snackBar.openFromComponent(ErrorServiceToast, {
        duration: 5000,
        verticalPosition: "top" as MatSnackBarVerticalPosition,
        horizontalPosition: "right" as MatSnackBarHorizontalPosition
      });
      return Observable.throw(error);
    }) as any;
  }
}

@Component({
  selector: 'error-service-toast',
  template: ` <span>
                Error: Failed to process the request
                <button mat-icon-button (click)="dismiss()">
                    <mat-icon>close</mat-icon>
                </button>
              </span>
            `,
  styles: [`
    span { font-family: Roboto; }    
  `],
})
export class ErrorServiceToast {

  constructor(public snackBar: MatSnackBar) { }

  dismiss() {
    this.snackBar.dismiss();
  }
}