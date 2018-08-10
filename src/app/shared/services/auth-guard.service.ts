import {CanActivate} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Subscription} from "rxjs/internal/Subscription";
import {Observable} from "rxjs/internal/Observable";

@Injectable()
export class AuthGuardService implements CanActivate {
    subscription: Subscription;

  constructor(private authService: AuthService) {}
    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        if (this.authService.getToken()) {
            return true;
        } else {
            return new Promise((resolve, reject) => {
                this.subscription = this.authService.userSubject.subscribe(
                    (user) => {
                        if (!user) {
                            return;
                        }
                        this.subscription.unsubscribe();
                        return resolve(this.authService.isAuthenticated());
                    },
                    (error) => {
                        this.subscription.unsubscribe();
                        return resolve(false);
                    }
                );
            });
        }
    }

}

