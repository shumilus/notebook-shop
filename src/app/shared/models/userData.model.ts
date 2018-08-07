export class UserData {
  public email: string;
  public isAdmin: boolean;
  public token: string;

  constructor(email: string, isAdmin: boolean, token: string, ) {
    this.email = email;
    this.isAdmin = isAdmin;
    this.token = token;
  }
}
