import api from '../../api';
import { Dispatch } from 'redux';

// Action types
export const POST_JOB_REQUEST = 'POST_JOB_REQUEST';
export const POST_JOB_SUCCESS = 'POST_JOB_SUCCESS';
export const POST_JOB_FAILURE = 'POST_JOB_FAILURE';

export const GET_JOB_REQUEST = 'GET_JOB_REQUEST';
export const GET_JOB_SUCCESS = 'GET_JOB_SUCCESS';
export const GET_JOB_FAILURE = 'GET_JOB_FAILURE';

export const DELETE_JOB_REQUEST = 'DELETE_JOB_REQUEST';
export const DELETE_JOB_SUCCESS = 'DELETE_JOB_SUCCESS';
export const DELETE_JOB_FAILURE = 'DELETE_JOB_FAILURE';

export const UPDATE_JOB_REQUEST = 'UPDATE_JOB_REQUEST';
export const UPDATE_JOB_SUCCESS = 'UPDATE_JOB_SUCCESS';
export const UPDATE_JOB_FAILURE = 'UPDATE_JOB_FAILURE';



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

interface GetJobRequestAction {
  type: typeof GET_JOB_REQUEST;
}

interface GetJobSuccessAction {
  type: typeof GET_JOB_SUCCESS;
  payload: any;
}

interface GetJobFailureAction {
  type: typeof GET_JOB_FAILURE;
  payload: string;
}



export type JobActionTypes = 
  | PostJobRequestAction 
  | PostJobSuccessAction 
  | PostJobFailureAction
  | GetJobRequestAction 
  | GetJobSuccessAction 
  | GetJobFailureAction;

// Async action creator with TypeScript

export const postJob = (data: any) => {
  return async (dispatch: Dispatch<JobActionTypes>) => {
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

export const getJobLists = () => {
  return async (dispatch: Dispatch<JobActionTypes>) => {
    dispatch({ type: GET_JOB_REQUEST });
    try {
      const response = await api.get(`/requisition/`);
      dispatch({
        type: GET_JOB_SUCCESS,
        payload: response.data
      });
      return response;
    } catch (error) {
      let errorMessage = 'Failed to login';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: GET_JOB_FAILURE,
        payload: errorMessage
      });
      return error;
    }
  };
};