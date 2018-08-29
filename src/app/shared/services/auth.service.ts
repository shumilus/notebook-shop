import * as firebase from 'firebase';
import {BehaviorSubject} from 'rxjs';
import {Injectable} from '@angular/core';
import {UserData} from '../models/userData.model';
import {Router} from '@angular/router';
import {ToasterService} from 'angular2-toaster';
import {environment} from '../../../environments/environment';

@Injectable()
export class AuthService {
  userSubject = new BehaviorSubject<UserData>(null);
  adminEmail = 'admin@admin.com';

  /**
   * @summary Auth service constructor.
   * @param router - Router service
   * @param toasterService - Toaster service (toaster)
   */
  constructor(private toasterService: ToasterService,
              private router: Router) {
  }

  /**
   * @summary Create new user with email and password data
   * @param email - email data
   * @param password - password data
   */
  singupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        () => {
          this.toasterService.pop('success', 'You have successfully registered!');
          this.singinUser(email, password);
        }
      ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

  /**
   * @summary get user token
   */
  getToken() {
    return this.userSubject.value;
  }

  /**
   * @summary login user
   */
  singinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        (response) => {
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => {
                const isAdmin = this.adminEmail === email;
                this.userSubject.next({email: email, isAdmin: isAdmin, token: token});
                this.userSubject.value.token = token;
                this.toasterService.pop('success', 'You have successfully login!');
                this.router.navigate(['/']);
              }
            );
        }
      )
      .catch(
        (error) => {
          this.userSubject.next(null);
          this.toasterService.pop('error', 'You have not login!');
        }
      );
  }

  /**
   * @summary Logout user
   */
  logout() {
    firebase.auth().signOut();
    this.userSubject.next(null);
    this.router.navigate(['/']);
    this.toasterService.pop('success', 'You left your account!');
  }

  /**
   *  @summary Check login
   */
  checkLogin(): Promise<UserData | boolean> {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          user.getIdToken().then((token) => {
            const isAdmin = this.adminEmail === user.email;
            return resolve({email: user.email, isAdmin: isAdmin, token: token});
          });
        } else {
          return resolve(false);
        }
      });
    });
  }

  /**
   *  @summary Check user is already login
   */
  isAuthenticated() {
    return this.userSubject.value.token != null;
  }

  initializeApp() {
    firebase.initializeApp({
      apiKey: environment.apiKey,
      authDomain: environment.authDomain
    });
  }

}
