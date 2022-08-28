import { AuthorizationStatus, NameSpace } from '../../const';
import { State } from '../../types/state';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getLoginError = (state: State): string => state[NameSpace.User].loginError;
export const getAvatar = (state: State): string => state[NameSpace.User].avatar;
