import api from '../../api';
import { Dispatch } from 'redux';

// Action types
export const POST_JOB_REQUEST = 'POST_JOB_REQUEST';
export const POST_JOB_SUCCESS = 'POST_JOB_SUCCESS';
export const POST_JOB_FAILURE = 'POST_JOB_FAILURE';


interface PostJobRequestAction {
  type: typeof POST_JOB_REQUEST;
}

interface PostJobSuccessAction {
  type: typeof POST_JOB_SUCCESS;
  payload: any;
}

interface PostJobFailureAction {
  type: typeof POST_JOB_FAILURE;
  payload: string;
}

export type UserActionTypes = 
  | PostJobRequestAction 
  | PostJobSuccessAction 
  | PostJobFailureAction;

// Async action creator with TypeScript

export const postJob = (data: any) => {
  return async (dispatch: Dispatch<UserActionTypes>) => {
    dispatch({ type: POST_JOB_REQUEST });
    try {
      const response = await api.post(`/requisition/`, data);
      dispatch({
        type: POST_JOB_SUCCESS,
        payload: response.data
      });
      return response;
    } catch (error) {
      let errorMessage = 'Failed to login';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: POST_JOB_FAILURE,
        payload: errorMessage
      });
      return error;
    }
  };
};