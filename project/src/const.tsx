export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id/:filmType',
  NotFound = '/404',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Films = '/films',
  Film = '/films/:filmId',
  Similar = '/films/:filmId/similar',
  Promo = '/promo',
  Favorite = '/favorite',
  StatusFavorite = '/favorite/:filmId/:status',
  Comments = '/comments/:filmId',
  Login = '/login',
  Logout = '/logout',
}

export enum NameSpace {
  Film = 'FILM',
  User = 'USER',
  Comment = 'COMMENT'
}

export const AllGENRES = 'All genres';

export const FILMS_AMOUNT = 8;
