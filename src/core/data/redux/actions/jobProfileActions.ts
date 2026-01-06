import api from "../../api";
import { Dispatch } from 'redux';

export const CREATE_JOB_PROFILE_REQUEST = 'CREATE_JOB_PROFILE_REQUEST';
export const CREATE_JOB_PROFILE_SUCCESS = 'CREATE_JOB_PROFILE_SUCCESS';
export const CREATE_JOB_PROFILE_FAILURE = 'CREATE_JOB_PROFILE_FAILURE';

export const GET_JOB_PROFILE_REQUEST = 'GET_JOB_PROFILE_REQUEST';
export const GET_JOB_PROFILE_SUCCESS = 'GET_JOB_PROFILE_SUCCESS';
export const GET_JOB_PROFILE_FAILURE = 'GET_JOB_PROFILE_FAILURE';

export const CREATE_COMPENTANCY_REQUEST = 'CREATE_COMPENTANCY_REQUEST';
export const CREATE_COMPENTANCY_SUCCESS = 'CREATE_COMPENTANCY_SUCCESS';
export const CREATE_COMPENTANCY_FAILURE = 'CREATE_COMPENTANCY_FAILURE';

export const GET_COMPENTANCY_REQUEST = 'GET_COMPENTANCY_REQUEST';
export const GET_COMPENTANCY_SUCCESS = 'GET_COMPENTANCY_SUCCESS';
export const GET_COMPENTANCY_FAILURE = 'GET_COMPENTANCY_FAILURE';

export const CREATE_JOB_FAMILY_REQUEST = 'CREATE_JOB_FAMILY_REQUEST';
export const CREATE_JOB_FAMILY_SUCCESS = 'CREATE_JOB_FAMILY_SUCCESS';
export const CREATE_JOB_FAMILY_FAILURE = 'CREATE_JOB_FAMILY_FAILURE';

export const GET_JOB_FAMILY_REQUEST = 'GET_JOB_FAMILY_REQUEST';
export const GET_JOB_FAMILY_SUCCESS = 'GET_JOB_FAMILY_SUCCESS';
export const GET_JOB_FAMILY_FAILURE = 'GET_JOB_FAMILY_FAILURE';

export const GET_JOB_CODE_REQUEST = 'GET_JOB_CODE_REQUEST';
export const GET_JOB_CODE_SUCCESS = 'GET_JOB_CODE_SUCCESS';
export const GET_JOB_CODE_FAILURE = 'GET_JOB_CODE_FAILURE';

export const DELETE_POSITION_REQUEST = 'DELETE_POSITION_REQUEST';
export const DELETE_POSITION_SUCCESS = 'DELETE_POSITION_SUCCESS';
export const DELETE_POSITION_FAILURE = 'DELETE_POSITION_FAILURE';

export const GET_REQRUITER_DETAILS_REQUEST = 'GET_REQRUITER_DETAILS_REQUEST';
export const GET_REQRUITER_DETAILS_SUCCESS = 'GET_REQRUITER_DETAILS_SUCCESS';
export const GET_REQRUITER_DETAILS_FAILURE = 'GET_REQRUITER_DETAILS_FAILURE';

export const CREATE_JOB_ROLE_REQUEST = 'CREATE_JOB_ROLE_REQUEST';
export const CREATE_JOB_ROLE_SUCCESS = 'CREATE_JOB_ROLE_SUCCESS';
export const CREATE_JOB_ROLE_FAILURE = 'CREATE_JOB_ROLE_FAILURE';

export const GET_JOB_ROLE_REQUEST = 'GET_JOB_ROLE_REQUEST';
export const GET_JOB_ROLE_SUCCESS = 'GET_JOB_ROLE_SUCCESS';
export const GET_JOB_ROLE_FAILURE = 'GET_JOB_ROLE_FAILURE';


interface CreateJobProfileRequestAction {
  type: typeof CREATE_JOB_PROFILE_REQUEST;
}

interface CreateJobProfileSuccessAction {
  type: typeof CREATE_JOB_PROFILE_SUCCESS;
  payload: any;
}

interface CreateJobProfileFailureAction {
  type: typeof CREATE_JOB_PROFILE_FAILURE;
  payload: string;
}

interface GetJobProfileRequestAction {
  type: typeof GET_JOB_PROFILE_REQUEST;
}

interface GetJobProfileSuccessAction {
  type: typeof GET_JOB_PROFILE_SUCCESS;
  payload: any;
}

interface GetJobProfileFailureAction {
  type: typeof GET_JOB_PROFILE_FAILURE;
  payload: string;
}

interface CreateCompentancyRequestAction {
  type: typeof CREATE_COMPENTANCY_REQUEST;
}
interface CreateCompentancySuccessAction {
  type: typeof CREATE_COMPENTANCY_SUCCESS;
  payload: any;
}
interface CreateCompentancyFailureAction {
  type: typeof CREATE_COMPENTANCY_FAILURE;
  payload: string;
}
interface GetCompentancyRequestAction {
  type: typeof GET_COMPENTANCY_REQUEST;
}
interface GetCompentancySuccessAction {
  type: typeof GET_COMPENTANCY_SUCCESS;
  payload: any;
}
interface GetCompentancyFailureAction {
  type: typeof GET_COMPENTANCY_FAILURE;
  payload: string;
}
interface GetJobCodeRequestAction {
  type: typeof GET_JOB_CODE_REQUEST;
}
interface GetJobCodeSuccessAction {
  type: typeof GET_JOB_CODE_SUCCESS;
  payload: any;
}
interface GetJobCodeFailureAction {
  type: typeof GET_JOB_CODE_FAILURE;
  payload: string;
}
interface DeleteJobCodeRequestAction {
  type: typeof DELETE_POSITION_REQUEST;
}
interface DeleteJobCodeSuccessAction {
  type: typeof DELETE_POSITION_SUCCESS;
  payload: any;
}
interface DeleteJobCodeFailureAction {
  type: typeof DELETE_POSITION_FAILURE;
  payload: string;
}
interface GetReqruiterDetailsRequestAction {
  type: typeof GET_REQRUITER_DETAILS_REQUEST;
}
interface GetReqruiterDetailsSuccessAction {
  type: typeof GET_REQRUITER_DETAILS_SUCCESS;
  payload: any;
}
interface GetReqruiterDetailsFailureAction {
  type: typeof GET_REQRUITER_DETAILS_FAILURE;
  payload: string;
}
interface GetJobFamilyRequestAction {
  type: typeof GET_JOB_FAMILY_REQUEST;
}
interface GetJobFamilySuccessAction {
  type: typeof GET_JOB_FAMILY_SUCCESS;
  payload: any;
}
interface GetJobFamilyFailureAction {
  type: typeof GET_JOB_FAMILY_FAILURE;
  payload: string;
}
interface GetJobRoleRequestAction {
  type: typeof GET_JOB_ROLE_REQUEST;
}
interface GetJobRoleSuccessAction {
  type: typeof GET_JOB_ROLE_SUCCESS;
  payload: any;
}
interface GetJobRoleFailureAction {
  type: typeof GET_JOB_ROLE_FAILURE;
  payload: string;
}
interface CreateJobFamilyRequestAction {
  type: typeof CREATE_JOB_FAMILY_REQUEST;
}
interface CreateJobFamilySuccessAction {
  type: typeof CREATE_JOB_FAMILY_SUCCESS;
  payload: any;
}
interface CreateJobFamilyFailureAction {
  type: typeof CREATE_JOB_FAMILY_FAILURE;
  payload: string;
}
interface CreateJobRoleRequestAction {
  type: typeof CREATE_JOB_ROLE_REQUEST;
}
interface CreateJobRoleSuccessAction {
  type: typeof CREATE_JOB_ROLE_SUCCESS;
  payload: any;
}
interface CreateJobRoleFailureAction {
  type: typeof CREATE_JOB_ROLE_FAILURE;
  payload: string;
}





export type JobProfileActionTypes =
  | CreateJobProfileRequestAction
  | CreateJobProfileSuccessAction
  | CreateJobProfileFailureAction
  | GetJobProfileRequestAction
  | GetJobProfileSuccessAction
  | GetJobProfileFailureAction
  | CreateCompentancyRequestAction
  | CreateCompentancySuccessAction
  | CreateCompentancyFailureAction
  | GetCompentancyRequestAction
  | GetCompentancySuccessAction
  | GetCompentancyFailureAction
  | GetJobFamilyRequestAction
  | GetJobFamilySuccessAction
  | GetJobFamilyFailureAction
  | GetJobCodeRequestAction
  | GetJobCodeSuccessAction
  | GetJobCodeFailureAction
  | DeleteJobCodeRequestAction
  | DeleteJobCodeSuccessAction
  | DeleteJobCodeFailureAction
  | GetReqruiterDetailsRequestAction
  | GetReqruiterDetailsSuccessAction
  | GetReqruiterDetailsFailureAction
  | GetJobRoleRequestAction
  | GetJobRoleSuccessAction
  | GetJobRoleFailureAction
  | CreateJobFamilyRequestAction
  | CreateJobFamilySuccessAction
  | CreateJobFamilyFailureAction
  | CreateJobRoleRequestAction
  | CreateJobRoleSuccessAction
  | CreateJobRoleFailureAction;

export const postJobProfile = (data: any) => {
  return async (dispatch: Dispatch<JobProfileActionTypes>) => {
    dispatch({ type: CREATE_JOB_PROFILE_REQUEST });
    try {
      const response = await api.post(`/job-profile/add`, data);
      dispatch({
        type: CREATE_JOB_PROFILE_SUCCESS,
        payload: response.data
      });
      return response;
    } catch (error) {
      let errorMessage = 'Failed to login';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: CREATE_JOB_PROFILE_FAILURE,
        payload: errorMessage
      });
      return error;
    }
  };
};

export const getJobProfile = () => {
  return async (dispatch: Dispatch<JobProfileActionTypes>) => {
    dispatch({ type: GET_JOB_PROFILE_REQUEST });
    try {
      const response = await api.get(`/job-profile/get-all`);
      dispatch({
        type: GET_JOB_PROFILE_SUCCESS,
        payload: response.data
      });
      return response;
    } catch (error) {
      let errorMessage = 'Failed to login';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: GET_JOB_PROFILE_FAILURE,
        payload: errorMessage
      });
      return error;
    }
  };
};

export const createCompentancy = (data: any) => {
  return async (dispatch: Dispatch<JobProfileActionTypes>) => {
    dispatch({ type: CREATE_COMPENTANCY_REQUEST });
    try {
      const response = await api.post(`/competency/add`, data);
      dispatch({
        type: CREATE_COMPENTANCY_SUCCESS,
        payload: response.data
      });
      return response;
    } catch (error) {
      let errorMessage = 'Failed to login';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: CREATE_COMPENTANCY_FAILURE,
        payload: errorMessage
      });
      return error;
    }
  };
};

export const getCompentancy = () => {
  return async (dispatch: Dispatch<JobProfileActionTypes>) => {
    dispatch({ type: GET_COMPENTANCY_REQUEST });
    try {
      const response = await api.get(`/competency/get-all`);
      dispatch({
        type: GET_COMPENTANCY_SUCCESS,
        payload: response.data
      });
      return response;
    } catch (error) {
      let errorMessage = 'Failed to login';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: GET_COMPENTANCY_FAILURE,
        payload: errorMessage
      });
      return error;
    }
  };
};

export const getAllJobCode = () => {
  return async (dispatch: Dispatch<JobProfileActionTypes>) => {
    dispatch({ type: GET_JOB_CODE_REQUEST });
    try {
      const response = await api.get(`/position/get-all/jobcodes`);
      dispatch({
        type: GET_JOB_CODE_SUCCESS,
        payload: response.data
      });
      return response;
    } catch (error) {
      let errorMessage = 'Failed to login';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: GET_JOB_CODE_FAILURE,
        payload: errorMessage
      });
      return error;
    }
  };
};

export const getReqruiterDetails_BasedCriteria = (data: any) => {
  return async (dispatch: Dispatch<JobProfileActionTypes>) => {
    dispatch({ type: GET_REQRUITER_DETAILS_REQUEST });
    try {
      const response = await api.post(`/position/get-all/recruiters`, data);
      dispatch({
        type: GET_REQRUITER_DETAILS_SUCCESS,
        payload: response.data
      });
      return response;
    } catch (error) {
      let errorMessage = 'Failed to login';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: GET_REQRUITER_DETAILS_FAILURE,
        payload: errorMessage
      });
      return error;
    }
  };
};

export const deleteposition = (id: any) => {
  return async (dispatch: Dispatch<JobProfileActionTypes>) => {
    dispatch({ type: DELETE_POSITION_REQUEST });
    try {
      const response = await api.delete(`/position/${id}`);
      dispatch({
        type: DELETE_POSITION_SUCCESS,
        payload: response.data
      });
      return response;
    } catch (error) {
      let errorMessage = 'Failed to delete';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: DELETE_POSITION_FAILURE,
        payload: errorMessage
      });
      return error;
    }
  };
};

export const getJobFamily = () => {
  return async (dispatch: Dispatch<JobProfileActionTypes>) => {
    dispatch({ type: GET_JOB_FAMILY_REQUEST });
    try {
      const response = await api.get(`/job-family/get-all`);
      dispatch({
        type: GET_JOB_FAMILY_SUCCESS,
        payload: response.data
      });
      return response;
    } catch (error) {
      let errorMessage = 'Failed to login';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: GET_JOB_FAMILY_FAILURE,
        payload: errorMessage
      });
      return error;
    }
  };
};

export const getJobRole = () => {
  return async (dispatch: Dispatch<JobProfileActionTypes>) => {
    dispatch({ type: GET_JOB_ROLE_REQUEST });
    try {
      const response = await api.get(`/job-role/get-all`);
      dispatch({
        type: GET_JOB_ROLE_SUCCESS,
        payload: response.data
      });
      return response;
    } catch (error) {
      let errorMessage = 'Failed to login';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: GET_JOB_ROLE_FAILURE,
        payload: errorMessage
      });
      return error;
    }
  };
};

export const createJobFamily = (data: any) => {
  return async (dispatch: Dispatch<JobProfileActionTypes>) => {
    dispatch({ type: CREATE_JOB_FAMILY_REQUEST });
    try {
      const response = await api.post(`/job-family/add`, data);
      dispatch({
        type: CREATE_JOB_FAMILY_SUCCESS,
        payload: response.data
      });
      return response;
    } catch (error) {
      let errorMessage = 'Failed to login';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: CREATE_JOB_FAMILY_FAILURE,
        payload: errorMessage
      });
      return error;
    }
  };
};

export const createJobRole = (data: any) => {
  return async (dispatch: Dispatch<JobProfileActionTypes>) => {
    dispatch({ type: CREATE_JOB_ROLE_REQUEST });
    try {
      const response = await api.post(`/job-role/add`, data);
      dispatch({
        type: CREATE_JOB_ROLE_SUCCESS,
        payload: response.data
      });
      return response;
    } catch (error) {
      let errorMessage = 'Failed to login';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: CREATE_JOB_ROLE_FAILURE,
        payload: errorMessage
      });
      return error;
    }
  };
};