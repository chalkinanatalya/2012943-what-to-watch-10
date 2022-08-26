import { Film } from './film';

export type IsFavoriteAction = {
  data: Film,
  isPromo?: boolean,
};
