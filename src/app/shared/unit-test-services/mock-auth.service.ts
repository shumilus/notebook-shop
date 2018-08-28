import {of} from "rxjs";
import {UserData} from "@shared/models/userData.model";
import * as firebase from "firebase";

export const user = {
  email: 'test',
  isAdmin: true
};

export class MockAuthService {
  userSubject = of({email: user.email, isAdmin: user.isAdmin, token: 'test'});

  logout() {
    of(null);
  }

  singinUser(emai: string, password: string) {
  }

  singupUser(emai: string, password: string) {
  }

  initializeApp() {
  }

  // checkLogining() {
  //   of({email: 'test@test.com', isAdmin: true, token: 'test'});
  // }

  checkLogining(): Promise<UserData | boolean> {
    return new Promise((resolve, reject) => {
      return resolve({email: user.email, isAdmin: user.isAdmin, token: 'test'});
    });
  }

}