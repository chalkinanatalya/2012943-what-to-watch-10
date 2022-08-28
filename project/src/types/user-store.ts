import { AuthorizationStatus } from '../const';

export type UserStore = {
  avatar: string,
  authorizationStatus: AuthorizationStatus,
  loginError: string,
}
