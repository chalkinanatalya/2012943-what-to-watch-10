import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { Film, Films } from '../types/film';
import { cleanOneFilm, loadComments, loadFavorite, loadFilms, loadOneFilm, loadPromo, loadSimilar, redirectToRoute, requireAuthorization, setAvatar, setCommentError, setDataLoadingStatus, setFilmLoadingStatus, setLoginError } from './action';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data.js';
import { UserData } from '../types/user-data.js';
import { generatePath } from 'react-router-dom';
import { Comments } from '../types/comment.js';
import { CommentData } from '../types/comment-data.js';
import { IsFavoriteData } from '../types/is-favorite-data.js';

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
    dispatch(setFilmLoadingStatus(true));
    await api.get<Film>(generatePath(APIRoute.Film, { filmId: filmId }))
      .then((response: AxiosResponse) => {
        dispatch(loadOneFilm(response.data));
        dispatch(setFilmLoadingStatus(false));
      })
      .catch((reason: AxiosError) => {
        if (reason.response?.status === 404) {
          dispatch(setFilmLoadingStatus(false));
          dispatch(redirectToRoute(AppRoute.NotFound));
        }
      });
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

export const fetchFavoriteAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFavorite',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Films>(APIRoute.Favorite);
    dispatch(loadFavorite(data));
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

export const postCommentAction = createAsyncThunk<void, CommentData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/postComment',
  async ({ id, comment, rating }, { dispatch, extra: api }) => {
    await api.post<Comment>(generatePath(APIRoute.Comments, { filmId: String(id) }), { comment, rating })
      .then(() => {
        dispatch(setCommentError(''));
        dispatch(redirectToRoute(generatePath(APIRoute.Film, { filmId: String(id) })));
      })
      .catch(() => {
        dispatch(setCommentError('Something went wrong, try again later'));
      });
  },
);

export const postIsFavoriteAction = createAsyncThunk<void, IsFavoriteData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/postIsFavorite',
  async ({ id, status, isPromo }, { dispatch, extra: api }) => {
    await api.post<Film>(generatePath(APIRoute.StatusFavorite, { filmId: String(id), status: String(status) }))
      .then((response: AxiosResponse) => {
        dispatch(loadOneFilm(response.data));
        if (isPromo) {
          dispatch(loadPromo(response.data));
        }
      });
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    await api.get<UserData>(APIRoute.Login)
      .then((response: AxiosResponse) => {
        saveToken(response.data.token);
        dispatch(setAvatar(response.data.avatarUrl));
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
      })
      .catch(() => {
        dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      });
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
        dispatch(setAvatar(response.data.avatarUrl));
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
