export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum Genre {
  AllGenres = 'ALLGENRES',
  Comedies = 'COMEDY',
  Crime = 'CRIME',
  Documentary = 'DOCUMENTARY',
  Dramas = 'DRAMA',
  Horror = 'HORROR',
  KidsFamily = 'KIDS_FAMILY',
  Romance = 'ROMANCE',
  SciFi = 'SCI_FI',
  Thriller = 'THRILLER',
}
