import {User} from './user';

export class AuthorizeUser extends User{
  authenticationProviderId:string
  authenticationId:string
}
