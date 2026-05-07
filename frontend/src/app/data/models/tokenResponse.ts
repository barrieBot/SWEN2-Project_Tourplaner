import {User} from './user';

export interface TokenResponse {
  token: string;
  expiry: string;
  user: User;
}
