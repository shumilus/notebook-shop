import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Subscription} from "rxjs/internal/Subscription";

@Injectable()
export class AuthGuardService implements CanActivate {
    subscription: Subscription;

  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.isAuthenticated();

  //   if (this.authService.getToken()) {
  //       return true;
  //   } else {
  //       return new Promise((resolve, reject) => {
  //           this.subscription = this.authService.userSubject.subscribe(
  //               (token) => {
  //                   if (!token) {
  //                       return;
  //                   }
  //                   this.subscription.unsubscribe();
  //                   return resolve(this.authService.isAuthenticated());
  //               },
  //               (error) => {
  //                   this.subscription.unsubscribe();
  //                   return resolve(false);
  //               }
  //           );
  //       });
  //   }
  }

}

