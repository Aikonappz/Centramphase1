import {
    UserActionTypes,
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
    User,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAILURE
  } from '../actions/userActions';
  
  export interface UserState {
    user: any | null;
    loading: boolean;
    error: string | null;
    userSession: any | null;
  }
  
  const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
    userSession: null
  };
  
  // Use Reducer type for better type safety
  const userReducer = (
    state: UserState = initialState,
    action: UserActionTypes
  ): UserState => {
    switch (action.type) {
      case USER_SIGNIN_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case USER_SIGNIN_SUCCESS:
        return {
          ...state,
          loading: false,
          userSession: action.payload,
          error: null
        };
      case USER_SIGNIN_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      case FETCH_USER_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case FETCH_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          user: action.payload,
          error: null
        };
      case FETCH_USER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default userReducer;