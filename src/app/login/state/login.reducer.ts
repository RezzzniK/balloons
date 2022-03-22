import { createReducer, on } from '@ngrx/store';

import { User } from 'src/app/_models/user.model';
import {
  LoginInProcess,
  LoginFailed,
  LoginSuccess,
  LogOut,
} from '../state/login.actions';

//import { User } from '../../_models/user.model';
export interface loginState {
  userS: User;
  loginInProcess: boolean;
  loginFailed: boolean;
  loginSuccess: boolean;
}
export const loginFeatureKey = 'login';
export const initialState: loginState = {
  //initial state of app before any actions to be dispatched

  userS: null,
  loginInProcess: false,
  loginFailed: false,
  loginSuccess: false,
};
export const loginReducer = createReducer(
  initialState,
  on(LoginInProcess, (state, action) => ({
    ...state,
    userS: action.user,
    loginInProcess: true,
  })),
  on(LoginSuccess, (state, action) => ({
    ...state,
    userS: action.user,
    loginInProcess: false,
    loginFailed: false,
    loginSuccess: true,
  })),
  on(LoginFailed, (state) => ({
    ...state,
    loginFailed: true,
    loginInProcess: false,
  })),
  on(LogOut, (state) => ({
    ...state,
    userS: null,
    loginInProcess: false,
    loginFailed: false,
    loginSuccess: false,
  }))
);
