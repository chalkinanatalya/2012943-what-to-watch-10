import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { Film, Films } from '../types/film';
import { cleanOneFilm, loadComments, loadFilms, loadOneFilm, loadPromo, loadSimilar, redirectToRoute, requireAuthorization, setDataLoadingStatus, setLoginError } from './action';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data.js';
import { UserData } from '../types/user-data.js';
import { generatePath } from 'react-router-dom';
import { Comments } from '../types/comment.js';

export const fetchFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFilms',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Films>(APIRoute.Films);
    dispatch(loadFilms(data));
    dispatch(setDataLoadingStatus(false));
  },
);

export const fetchSimilarAction = createAsyncThunk<void, string | undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchSimilar',
  async (filmId, { dispatch, extra: api }) => {
    dispatch(loadSimilar([]));
    const { data } = await api.get<Films>(generatePath(APIRoute.Similar, { filmId: filmId }));
    dispatch(loadSimilar(data));
  },
);

export const fetchOneFilmAction = createAsyncThunk<void, string | undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOneFilm',
  async (filmId, { dispatch, extra: api }) => {
    dispatch(cleanOneFilm());
    const { data } = await api.get<Film>(generatePath(APIRoute.Film, { filmId: filmId }));
    dispatch(loadOneFilm(data));
  },
);


export const fetchPromoAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchPromo',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setDataLoadingStatus(true));
    const { data } = await api.get<Film>(APIRoute.Promo);
    dispatch(loadPromo(data));
    dispatch(setDataLoadingStatus(false));
  },
);

export const fetchCommentsAction = createAsyncThunk<void, string | undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchComments',
  async (filmId, { dispatch, extra: api }) => {
    dispatch(loadComments([]));
    const { data } = await api.get<Comments>(generatePath(APIRoute.Comments, { filmId: filmId }));
    dispatch(loadComments(data));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    await api.post<UserData>(APIRoute.Login, { email, password })
      .then((response: AxiosResponse) => {
        saveToken(response.data.token);
        dispatch(setLoginError(''));
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
        dispatch(redirectToRoute(AppRoute.Main));
      })
      .catch((reason: AxiosError) => {
        if (reason.response?.status === 400) {
          dispatch(setLoginError('Please enter a valid email address'));
          dispatch(redirectToRoute(AppRoute.SignIn));
        }
      });
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
