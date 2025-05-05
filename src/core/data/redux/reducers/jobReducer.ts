import {
    JobActionTypes,
    POST_JOB_REQUEST,
    POST_JOB_SUCCESS,
    POST_JOB_FAILURE,
    GET_JOB_REQUEST,
    GET_JOB_SUCCESS,
    GET_JOB_FAILURE,
    GET_POSITION_REQUEST,
    GET_POSITION_SUCCESS,
    GET_POSITION_FAILURE,
    GET_POSITION_BY_ID_REQUEST,
    GET_POSITION_BY_ID_SUCCESS,
    GET_POSITION_BY_ID_FAILURE,
    GET_DIVISION_REQUEST,
    GET_DIVISION_SUCCESS,
    GET_DIVISION_FAILURE,
    GET_BUSINESS_UNIT_REQUEST,
    GET_BUSINESS_UNIT_SUCCESS,
    GET_BUSINESS_UNIT_FAILURE,
    GET_DEPARTMENT_REQUEST,
    GET_DEPARTMENT_SUCCESS,
    GET_DEPARTMENT_FAILURE,
    GET_ORGANISATION_REQUEST,
    GET_ORGANISATION_SUCCESS,
    GET_ORGANISATION_FAILURE
  } from '../actions/requisitionActions';
  
  export interface JobState {
    user: any | null;
    loading: boolean;
    error: string | null;
    userSession: any | null;
    positionList: any | null;
    positionById: any | null;
    division: any | null;
    businessUnit: any | null;
    department: any | null;
    organisation: any | null;
  }
  
  const initialState: JobState = {
    user: null,
    loading: false,
    error: null,
    userSession: null,
    positionList: null,
    positionById: null,
    division: null,
    businessUnit: null,
    department: null,
    organisation: null
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
      case GET_POSITION_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case GET_POSITION_SUCCESS:
        return {
          ...state,
          loading: false,
          positionList: action.payload,
          error: null
        };
      case GET_POSITION_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      case GET_POSITION_BY_ID_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case GET_POSITION_BY_ID_SUCCESS:
        return {
          ...state,
          loading: false,
          positionById: action.payload,
          error: null
        };
      case GET_POSITION_BY_ID_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      case GET_DIVISION_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case GET_DIVISION_SUCCESS:
        return {
          ...state,
          loading: false,
          division: action.payload,
          error: null
        };
      case GET_DIVISION_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      case GET_BUSINESS_UNIT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case GET_BUSINESS_UNIT_SUCCESS:
        return {
          ...state,
          loading: false,
          businessUnit: action.payload,
          error: null
        };
      case GET_BUSINESS_UNIT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      case GET_DEPARTMENT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case GET_DEPARTMENT_SUCCESS:
        return {
          ...state,
          loading: false,
          department: action.payload,
          error: null
        };
      case GET_DEPARTMENT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      case GET_ORGANISATION_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case GET_ORGANISATION_SUCCESS:
        return {
          ...state,
          loading: false,
          organisation: action.payload,
          error: null
        };
      case GET_ORGANISATION_FAILURE:
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