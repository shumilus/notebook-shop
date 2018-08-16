import {Observable} from "rxjs";

export const user = {
  email: 'test',
  isAdmin: true
};

export class MockAuthService {
  userSubject = Observable.of(user);

  logout() {
    Observable.of(null);
  }

  singinUser(emai: string, password: string) {

  }

  singupUser(emai: string, password: string) {

  }
}