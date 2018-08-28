import {CanActivate, Router,} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Observable} from "rxjs/internal/Observable";
import {UserData} from "@shared/models/userData.model";

@Injectable()
export class AuthGuardService implements CanActivate {
  /**
   * @summary AuthGuard service constructor.
   * @param authService - Auth service
   * @param router
   */
  constructor(private authService: AuthService,
              private router: Router) {
  }

  /**
   * Check allow access for admin
   */
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.getToken()) {
      return true;
    }
    return this.authService.checkLogining()
      .then((userData: UserData) => {
        if (userData && userData.isAdmin == true) {
          this.authService.userSubject.next(userData);
          return true
        }
        this.router.navigate(['./']);
        return false;
      });
  }
}

