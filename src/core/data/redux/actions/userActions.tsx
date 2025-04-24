import api from '../../api';
import { Dispatch } from 'redux';

// Action types
export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export const USER_SIGNIN_REQUEST = 'USER_SIGNIN_REQUEST';
export const USER_SIGNIN_SUCCESS = 'USER_SIGNIN_SUCCESS';
export const USER_SIGNIN_FAILURE = 'USER_SIGNIN_FAILURE';

// Types for our actions
interface UserSignInRequestAction {
  type: typeof USER_SIGNIN_REQUEST;
}

interface UserSignInSuccessAction {
  type: typeof USER_SIGNIN_SUCCESS;
  payload: User;
}

interface UserSignInFailureAction {
  type: typeof USER_SIGNIN_FAILURE;
  payload: string;
}

interface FetchUserRequestAction {
  type: typeof FETCH_USER_REQUEST;
}

interface FetchUserSuccessAction {
  type: typeof FETCH_USER_SUCCESS;
  payload: User;
}

interface FetchUserFailureAction {
  type: typeof FETCH_USER_FAILURE;
  payload: string;
}

export type UserActionTypes = 
  | FetchUserRequestAction 
  | FetchUserSuccessAction 
  | FetchUserFailureAction
  | UserSignInRequestAction
  | UserSignInSuccessAction
  | UserSignInFailureAction;

// User type
export interface User {
  id: number;
  name: string;
  email: string;
  // Add other user properties as needed
}

// Async action creator with TypeScript

export const userSignIn = (data: any) => {
  return async (dispatch: Dispatch<UserActionTypes>) => {
    dispatch({ type: USER_SIGNIN_REQUEST });
    
    try {
      const response = await api.get<User>(`/user/sign-in`);
      dispatch({
        type: USER_SIGNIN_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      let errorMessage = 'Failed to login';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: USER_SIGNIN_FAILURE,
        payload: errorMessage
      });
    }
  };
};

export const fetchUser = (userId: number) => {
  return async (dispatch: Dispatch<UserActionTypes>) => {
    dispatch({ type: FETCH_USER_REQUEST });
    
    try {
      const response = await api.get<User>(`/users/${userId}`);
      dispatch({
        type: FETCH_USER_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      let errorMessage = 'Failed to fetch user';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: FETCH_USER_FAILURE,
        payload: errorMessage
      });
    }
  };
};