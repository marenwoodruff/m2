import {AuthorizedUser} from './authorizedUser';

export class User {
  id: number;
  name: string;
  company: string;
  jobTitle: string;
  email: string;
  admin: boolean;
  password: string;
  phone: string;
  authenticationProvider: boolean;

  constructor(authorizedUser?: AuthorizedUser) {
    if (authorizedUser) {
      this.id = authorizedUser.id;
      this.name = authorizedUser.name;
      this.company = authorizedUser.company;
      this.jobTitle = authorizedUser.jobTitle;
      this.email = authorizedUser.email;
      this.phone = authorizedUser.phone ? authorizedUser.phone : '';
      this.authenticationProvider = authorizedUser.authenticationProvider;
    }
  }
}
