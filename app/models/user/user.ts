import {AuthorizedUser} from './authorizedUser';

export class User {
    id:number
    name:string
    company:string
    jobTitle:string
    email:string

    constructor(authorizedUser:AuthorizedUser) {
      this.id = authorizedUser.id;
      this.name = authorizedUser.name;
      this.company = authorizedUser.company;
      this.jobTitle = authorizedUser.jobTitle;
      this.email = authorizedUser.email;
    }
}
