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
  adminEmail = 'test@test.com';

  constructor(private toasterService: ToasterService,
              private router: Router) {
  }

  singupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        () => {
          this.singinUser(email, password);
        }
      ).catch(
        (error) => {
          console.log(error);
        }
      );
  }

  getToken() {
    return this.userSubject.value;
  }

  singinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        (response) => {
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => {
                const isAdmin = this.adminEmail === email;
                // this.userEmail.next(email);
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

  logout() {
    firebase.auth().signOut();
    this.userSubject.next(null);
    this.router.navigate(['/']);
    this.toasterService.pop('success', 'You left your account!' );
  }

  checkLogining() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken().then((token) => {
          const isAdmin = this.adminEmail === user.email;
          // this.userEmail.next(user.email);
          this.userSubject.next({email: user.email, isAdmin: isAdmin, token: token});
        });
      }
    });
  }

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
