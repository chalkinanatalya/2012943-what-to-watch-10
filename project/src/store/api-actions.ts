import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Film, Films } from '../types/film';
import { APIRoute, AppRoute } from '../const';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { generatePath } from 'react-router-dom';
import { Comments } from '../types/comment';
import { CommentData } from '../types/comment-data';
import { IsFavoriteData } from '../types/is-favorite-data';
import { IsFavoriteAction } from '../types/is-favorite-action';
import { redirectToRoute } from './action';

export const fetchFilmsAction = createAsyncThunk<Films, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'filmData/fetchFilms',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Films>(APIRoute.Films);
    return data;
  },
);

export const fetchSimilarAction = createAsyncThunk<Films, string | undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'filmData/fetchSimilar',
  async (filmId, { dispatch, extra: api }) => {
    const { data } = await api.get<Films>(generatePath(APIRoute.Similar, { filmId: filmId }));
    return data;
  },
);

export const fetchOneFilmAction = createAsyncThunk<Film | void, string | undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOneFilm',
  async (filmId, { dispatch, extra: api }) => {
    let data;
    await api.get<Film>(generatePath(APIRoute.Film, { filmId: filmId }))
      .then((response: AxiosResponse) => {
        data = response.data;
      })
      .catch((reason: AxiosError) => {
        dispatch(redirectToRoute(AppRoute.NotFound));
      });
    return data;
  },
);

export const fetchPromoAction = createAsyncThunk<Film, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'filmData/fetchPromo',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Film>(APIRoute.Promo);
    return data;
  },
);

export const fetchFavoriteAction = createAsyncThunk<Films, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'filmData/fetchFavorite',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Films>(APIRoute.Favorite);
    return data;
  },
);

export const postIsFavoriteAction = createAsyncThunk<IsFavoriteAction, IsFavoriteData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'filmData/postIsFavorite',
  async ({ id, status, isPromo }, { dispatch, extra: api }) => {
    const { data } = await api.post<Film>(generatePath(APIRoute.StatusFavorite, { filmId: String(id), status: String(status) }));
    return { data, isPromo };
  },
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<UserData>(APIRoute.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<UserData | void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    let data;
    await api.post<UserData>(APIRoute.Login, { email, password })
      .then((response: AxiosResponse) => {
        data = response.data;
      })
      .catch((reason: AxiosError) => {
        dispatch(redirectToRoute(AppRoute.SignIn));
      });
    return data;
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
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const fetchCommentsAction = createAsyncThunk<Comments, string | undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'comment/fetchComments',
  async (filmId, { dispatch, extra: api }) => {
    const { data } = await api.get<Comments>(generatePath(APIRoute.Comments, { filmId: filmId }));
    return data;
  },
);

export const postCommentAction = createAsyncThunk<void, CommentData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'comment/postComment',
  async ({ id, comment, rating }, { dispatch, extra: api }) => {
    await api.post<Comment>(generatePath(APIRoute.Comments, { filmId: String(id) }), { comment, rating });
    dispatch(redirectToRoute(generatePath(APIRoute.Film, { filmId: String(id) })));
  },
);
