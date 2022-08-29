import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import { createAPI } from '../services/api';
import { redirect } from './middlewares/redirect';
import { redirectToRoute } from './action';
import { AppRoute } from '../const';

const getRedirect = (error: number): void => {
  let path = '';
  switch (error) {
    case 404:
      path = AppRoute.NotFound;
      break;
    case 400:
      path = AppRoute.SignIn;
      break;
  }
  store.dispatch(redirectToRoute(path));
};

export const api = createAPI((error: number) => getRedirect(error));

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});
