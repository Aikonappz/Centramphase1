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

export const GET_POSITION_REQUEST = 'GET_POSITION_REQUEST';
export const GET_POSITION_SUCCESS = 'GET_POSITION_SUCCESS';
export const GET_POSITION_FAILURE = 'GET_POSITION_FAILURE';

export const GET_POSITION_BY_ID_REQUEST = 'GET_POSITION_BY_ID_REQUEST';
export const GET_POSITION_BY_ID_SUCCESS = 'GET_POSITION_BY_ID_SUCCESS';
export const GET_POSITION_BY_ID_FAILURE = 'GET_POSITION_BY_ID_FAILURE';

export const GET_DIVISION_REQUEST = 'GET_DIVISION_REQUEST';
export const GET_DIVISION_SUCCESS = 'GET_DIVISION_SUCCESS';
export const GET_DIVISION_FAILURE = 'GET_DIVISION_FAILURE';

export const GET_DEPARTMENT_REQUEST = 'GET_DEPARTMENT_REQUEST';
export const GET_DEPARTMENT_SUCCESS = 'GET_DEPARTMENT_SUCCESS';
export const GET_DEPARTMENT_FAILURE = 'GET_DEPARTMENT_FAILURE';

export const GET_BUSINESS_UNIT_REQUEST = 'GET_BUSINESS_UNIT_REQUEST';
export const GET_BUSINESS_UNIT_SUCCESS = 'GET_BUSINESS_UNIT_SUCCESS';
export const GET_BUSINESS_UNIT_FAILURE = 'GET_BUSINESS_UNIT_FAILURE';





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

interface GetPositionRequestAction {
  type: typeof GET_POSITION_REQUEST;
}

interface GetPositionSuccessAction {
  type: typeof GET_POSITION_SUCCESS;
  payload: any;
}

interface GetPositionFailureAction {
  type: typeof GET_POSITION_FAILURE;
  payload: string;
}

interface GetPositionByIdRequestAction {
  type: typeof GET_POSITION_BY_ID_REQUEST;
}

interface GetPositionByIdSuccessAction {
  type: typeof GET_POSITION_BY_ID_SUCCESS;
  payload: any;
}

interface GetPositionByIdFailureAction {
  type: typeof GET_POSITION_BY_ID_FAILURE;
  payload: string;
}

interface GetDivisionRequestAction {
  type: typeof GET_DIVISION_REQUEST;
}

interface GetDivisionSuccessAction {
  type: typeof GET_DIVISION_SUCCESS;
  payload: any;
}

interface GetDivisionFailureAction {
  type: typeof GET_DIVISION_FAILURE;
  payload: string;
}

interface GetDepartmentRequestAction {
  type: typeof GET_DEPARTMENT_REQUEST;
}

interface GetDepartmentSuccessAction {
  type: typeof GET_DEPARTMENT_SUCCESS;
  payload: any;
}

interface GetDepartmentFailureAction {
  type: typeof GET_DEPARTMENT_FAILURE;
  payload: string;
}

interface GetBusinessUnitRequestAction {
  type: typeof GET_BUSINESS_UNIT_REQUEST;
}

interface GetBusinessUnitSuccessAction {
  type: typeof GET_BUSINESS_UNIT_SUCCESS;
  payload: any;
}

interface GetBusinessUnitFailureAction {
  type: typeof GET_BUSINESS_UNIT_FAILURE;
  payload: string;
}



export type JobActionTypes = 
  | PostJobRequestAction 
  | PostJobSuccessAction 
  | PostJobFailureAction
  | GetJobRequestAction 
  | GetJobSuccessAction 
  | GetJobFailureAction
  | GetPositionRequestAction 
  | GetPositionSuccessAction 
  | GetPositionFailureAction
  | GetPositionByIdRequestAction 
  | GetPositionByIdSuccessAction 
  | GetPositionByIdFailureAction
  | GetDivisionRequestAction 
  | GetDivisionSuccessAction 
  | GetDivisionFailureAction
  | GetDepartmentRequestAction 
  | GetDepartmentSuccessAction 
  | GetDepartmentFailureAction
  | GetBusinessUnitRequestAction 
  | GetBusinessUnitSuccessAction 
  | GetBusinessUnitFailureAction;

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

export const getDepartmentLists = () => {
  return async (dispatch: Dispatch<JobActionTypes>) => {
    dispatch({ type: GET_DEPARTMENT_REQUEST });
    try {
      const response = await api.get(`/department/`);
      dispatch({
        type: GET_DEPARTMENT_SUCCESS,
        payload: response.data
      });
      return response;
    } catch (error) {
      let errorMessage = 'Failed to login';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: GET_DEPARTMENT_FAILURE,
        payload: errorMessage
      });
      return error;
    }
  };
};

export const getBusinessUnit = () => {
  return async (dispatch: Dispatch<JobActionTypes>) => {
    dispatch({ type: GET_BUSINESS_UNIT_REQUEST });
    try {
      const response = await api.get(`/businessUnit/`);
      dispatch({
        type: GET_BUSINESS_UNIT_SUCCESS,
        payload: response.data
      });
      return response;
    } catch (error) {
      let errorMessage = 'Failed to login';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: GET_BUSINESS_UNIT_FAILURE,
        payload: errorMessage
      });
      return error;
    }
  };
};

export const getDivision = () => {
  return async (dispatch: Dispatch<JobActionTypes>) => {
    dispatch({ type: GET_DIVISION_REQUEST });
    try {
      const response = await api.get(`/division/`);
      dispatch({
        type: GET_DIVISION_SUCCESS,
        payload: response.data
      });
      return response;
    } catch (error) {
      let errorMessage = 'Failed to login';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: GET_DIVISION_FAILURE,
        payload: errorMessage
      });
      return error;
    }
  };
};

export const getPositions = () => {
  return async (dispatch: Dispatch<JobActionTypes>) => {
    dispatch({ type: GET_POSITION_REQUEST });
    try {
      const response = await api.get(`/position/`);
      dispatch({
        type: GET_POSITION_SUCCESS,
        payload: response.data
      });
      return response;
    } catch (error) {
      let errorMessage = 'Failed to login';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: GET_POSITION_FAILURE,
        payload: errorMessage
      });
      return error;
    }
  };
};

export const getPositionById = (id: any) => {
  return async (dispatch: Dispatch<JobActionTypes>) => {
    dispatch({ type: GET_POSITION_BY_ID_REQUEST });
    try {
      const response = await api.get(`/position/${id}`);
      dispatch({
        type: GET_POSITION_BY_ID_SUCCESS,
        payload: response.data
      });
      return response;
    } catch (error) {
      let errorMessage = 'Failed to login';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: GET_POSITION_BY_ID_FAILURE,
        payload: errorMessage
      });
      return error;
    }
  };
};