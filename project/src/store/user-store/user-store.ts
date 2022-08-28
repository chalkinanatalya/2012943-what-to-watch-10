import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const';
import { dropToken, saveToken } from '../../services/token';
import { UserStore } from '../../types/user-store';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';

const initialState: UserStore = {
  authorizationStatus: AuthorizationStatus.Unknown,
  loginError: '',
  avatar: '',
};

export const userStore = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setLoginError: (state, action) => {
      state.loginError = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        saveToken(action.payload.token);
        state.avatar = action.payload.avatarUrl;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        saveToken(action.payload.token);
        state.avatar = action.payload.avatarUrl;
        state.loginError = '';
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.loginError = 'Please enter a valid email address';
      })
      .addCase(logoutAction.fulfilled, (state, action) => {
        dropToken();
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});

export const { setLoginError } = userStore.actions;
