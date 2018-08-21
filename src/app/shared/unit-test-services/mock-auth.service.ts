import {of} from "rxjs";

export const user = {
  email: 'test',
  isAdmin: true
};

export class MockAuthService {
  userSubject = of(user);

  logout() {
    of(null);
  }

  singinUser(emai: string, password: string) {

  }

  singupUser(emai: string, password: string) {

  }
}