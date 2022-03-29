import { createAction, props } from '@ngrx/store';

import { User } from '../../_models/user.model';

export const LoginInProcess = createAction(
  '[Login Page] LogIn in process',
  props<{ user: User }>()
);
export const LoginFailed = createAction('[Login Page] LogIn Failed');
export const LoginSuccess = createAction(
  '[Login Page] Login Success',
  props<{ user: User }>()
);
export const LogOut = createAction('Logout');
export const CreateUser = createAction(
  'User Creatation',
  props<{ user: User }>()
);
