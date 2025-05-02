import {
    JobActionTypes,
    POST_JOB_REQUEST,
    POST_JOB_SUCCESS,
    POST_JOB_FAILURE,
    GET_JOB_REQUEST,
    GET_JOB_SUCCESS,
    GET_JOB_FAILURE,
    DELETE_JOB_REQUEST,
    DELETE_JOB_SUCCESS,
    DELETE_JOB_FAILURE,
    UPDATE_JOB_REQUEST,
    UPDATE_JOB_SUCCESS,
    UPDATE_JOB_FAILURE,
  } from '../actions/requisitionActions';
  
  export interface JobState {
    user: any | null;
    loading: boolean;
    error: string | null;
    userSession: any | null;
  }
  
  const initialState: JobState = {
    user: null,
    loading: false,
    error: null,
    userSession: null
  };
  
  // Use Reducer type for better type safety
  const jobReducer = (
    state: JobState = initialState,
    action: JobActionTypes
  ): JobState => {
    switch (action.type) {
      case POST_JOB_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case POST_JOB_SUCCESS:
        return {
          ...state,
          loading: false,
          userSession: action.payload,
          error: null
        };
      case POST_JOB_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      case GET_JOB_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case GET_JOB_SUCCESS:
        return {
          ...state,
          loading: false,
          user: action.payload,
          error: null
        };
      case GET_JOB_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default jobReducer;