import api from '../../api';
import { Dispatch } from 'redux';

// Action types
export const POST_JOB_REQUEST = 'POST_JOB_REQUEST';
export const POST_JOB_SUCCESS = 'POST_JOB_SUCCESS';
export const POST_JOB_FAILURE = 'POST_JOB_FAILURE';

export const GET_JOB_REQUEST = 'GET_JOB_REQUEST';
export const GET_JOB_SUCCESS = 'GET_JOB_SUCCESS';
export const GET_JOB_FAILURE = 'GET_JOB_FAILURE';

export const GET_JOB_BY_ID_REQUEST = 'GET_JOB_BY_ID_REQUEST';
export const GET_JOB_BY_ID_SUCCESS = 'GET_JOB_BY_ID_SUCCESS';
export const GET_JOB_BY_ID_FAILURE = 'GET_JOB_BY_ID_FAILURE';

export const DELETE_JOB_REQUEST = 'DELETE_JOB_REQUEST';
export const DELETE_JOB_SUCCESS = 'DELETE_JOB_SUCCESS';
export const DELETE_JOB_FAILURE = 'DELETE_JOB_FAILURE';

export const UPDATE_JOB_REQUEST = 'UPDATE_JOB_REQUEST';
export const UPDATE_JOB_SUCCESS = 'UPDATE_JOB_SUCCESS';
export const UPDATE_JOB_FAILURE = 'UPDATE_JOB_FAILURE';

export const GET_POSITION_REQUEST = 'GET_POSITION_REQUEST';
export const GET_POSITION_SUCCESS = 'GET_POSITION_SUCCESS';
export const GET_POSITION_FAILURE = 'GET_POSITION_FAILURE';

export const POST_POSITION_REQUEST = 'POST_POSITION_REQUEST';
export const POST_POSITION_SUCCESS = 'POST_POSITION_SUCCESS';
export const POST_POSITION_FAILURE = 'POST_POSITION_FAILURE';

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

export const GET_ORGANISATION_REQUEST = 'GET_ORGANISATION_REQUEST';
export const GET_ORGANISATION_SUCCESS = 'GET_ORGANISATION_SUCCESS';
export const GET_ORGANISATION_FAILURE = 'GET_ORGANISATION_FAILURE';

export const SAVE_ORGANISATION_REQUEST = 'SAVE_ORGANISATION_REQUEST';
export const SAVE_ORGANISATION_SUCCESS = 'SAVE_ORGANISATION_SUCCESS';
export const SAVE_ORGANISATION_FAILURE = 'SAVE_ORGANISATION_FAILURE';

export const SAVE_MANAGER_REVIEW_REQUEST = 'SAVE_MANAGER_REVIEW_REQUEST';
export const SAVE_MANAGER_REVIEW_SUCCESS = 'SAVE_MANAGER_REVIEW_SUCCESS';
export const SAVE_MANAGER_REVIEW_FAILURE = 'SAVE_MANAGER_REVIEW_FAILURE';

export const SAVE_RECRUITER_LEAD_REQUEST = 'SAVE_RECRUITER_LEAD_REQUEST';
export const SAVE_RECRUITER_LEAD_SUCCESS = 'SAVE_RECRUITER_LEAD_SUCCESS';
export const SAVE_RECRUITER_LEAD_FAILURE = 'SAVE_RECRUITER_LEAD_FAILURE';

export const SAVE_RECRUITER_REVIEW_REQUEST = 'SAVE_RECRUITER_REVIEW_REQUEST';
export const SAVE_RECRUITER_REVIEW_SUCCESS = 'SAVE_RECRUITER_REVIEW_SUCCESS';
export const SAVE_RECRUITER_REVIEW_FAILURE = 'SAVE_RECRUITER_REVIEW_FAILURE';

export const SAVE_FINAL_REVIEW_REQUEST = 'SAVE_FINAL_REVIEW_REQUEST';
export const SAVE_FINAL_REVIEW_SUCCESS = 'SAVE_FINAL_REVIEW_SUCCESS';
export const SAVE_FINAL_REVIEW_FAILURE = 'SAVE_FINAL_REVIEW_FAILURE';

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

interface GetJobByIdRequestAction {
  type: typeof GET_JOB_BY_ID_REQUEST;
}

interface GetJobByIdSuccessAction {
  type: typeof GET_JOB_BY_ID_SUCCESS;
  payload: any;
}

interface GetJobByIdFailureAction {
  type: typeof GET_JOB_BY_ID_FAILURE;
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

interface PostPositionRequestAction {
  type: typeof POST_POSITION_REQUEST;
}
interface PostPositionSuccessAction {
  type: typeof POST_POSITION_SUCCESS;
  payload: any;
}

interface PostPositionFailureAction {
  type: typeof POST_POSITION_FAILURE;
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

interface GetOrganisationRequestAction {
  type: typeof GET_ORGANISATION_REQUEST;
}

interface GetOrganisationSuccessAction {
  type: typeof GET_ORGANISATION_SUCCESS;
  payload: any;
}

interface GetOrganisationFailureAction {
  type: typeof GET_ORGANISATION_FAILURE;
  payload: string;
}

interface SaveOrganisationRequestAction {
  type: typeof SAVE_ORGANISATION_REQUEST;
}

interface SaveOrganisationSuccessAction {
  type: typeof SAVE_ORGANISATION_SUCCESS;
  payload: any;
}

interface SaveOrganisationFailureAction {
  type: typeof SAVE_ORGANISATION_FAILURE;
  payload: string;
}

interface SaveManagerReviewRequestAction {
  type: typeof SAVE_MANAGER_REVIEW_REQUEST;
}

interface SaveManagerReviewSuccessAction {
  type: typeof SAVE_MANAGER_REVIEW_SUCCESS;
  payload: any;
}

interface SaveManagerReviewFailureAction {
  type: typeof SAVE_MANAGER_REVIEW_FAILURE;
  payload: string;
}

interface SaveRecruiterLeadRequestAction {
  type: typeof SAVE_RECRUITER_LEAD_REQUEST;
}

interface SaveRecruiterLeadSuccessAction {
  type: typeof SAVE_RECRUITER_LEAD_SUCCESS;
  payload: any;
}

interface SaveRecruiterLeadFailureAction {
  type: typeof SAVE_RECRUITER_LEAD_FAILURE;
  payload: string;
}

interface SaveRecruiterReviewRequestAction {
  type: typeof SAVE_RECRUITER_REVIEW_REQUEST;
}

interface SaveRecruiterReviewSuccessAction {
  type: typeof SAVE_RECRUITER_REVIEW_SUCCESS;
  payload: any;
}

interface SaveRecruiterReviewFailureAction {
  type: typeof SAVE_RECRUITER_REVIEW_FAILURE;
  payload: string;
}

interface SaveFinalReviewRequestAction {
  type: typeof SAVE_FINAL_REVIEW_REQUEST;
}

interface SaveFinalReviewSuccessAction {
  type: typeof SAVE_FINAL_REVIEW_SUCCESS;
  payload: any;
}

interface SaveFinalReviewFailureAction {
  type: typeof SAVE_FINAL_REVIEW_FAILURE;
  payload: string;
}



export type JobActionTypes = 
  | PostJobRequestAction 
  | PostJobSuccessAction 
  | PostJobFailureAction
  | GetJobRequestAction 
  | GetJobSuccessAction 
  | GetJobFailureAction
  | GetJobByIdRequestAction 
  | GetJobByIdSuccessAction 
  | GetJobByIdFailureAction
  | GetPositionRequestAction 
  | GetPositionSuccessAction 
  | GetPositionFailureAction
  | PostPositionRequestAction 
  | PostPositionSuccessAction 
  | PostPositionFailureAction
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
  | GetBusinessUnitFailureAction
  | GetOrganisationRequestAction 
  | GetOrganisationSuccessAction 
  | GetOrganisationFailureAction
  | SaveOrganisationRequestAction 
  | SaveOrganisationSuccessAction 
  | SaveOrganisationFailureAction
  | SaveManagerReviewRequestAction
  | SaveManagerReviewSuccessAction
  | SaveManagerReviewFailureAction
  | SaveRecruiterLeadRequestAction
  | SaveRecruiterLeadSuccessAction
  | SaveRecruiterLeadFailureAction
  | SaveRecruiterReviewRequestAction
  | SaveRecruiterReviewSuccessAction
  | SaveRecruiterReviewFailureAction
  | SaveFinalReviewRequestAction
  | SaveFinalReviewSuccessAction
  | SaveFinalReviewFailureAction;

// Async action creator with TypeScript

export const postJob = (data: any) => {
  return async (dispatch: Dispatch<JobActionTypes>) => {
    dispatch({ type: POST_JOB_REQUEST });
    try {
      const response = await api.post(`/requisition/add`, data);
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

export const getJobLists = (id?: any) => {
  return async (dispatch: Dispatch<JobActionTypes>) => {
    dispatch({ type: id ? GET_JOB_BY_ID_REQUEST : GET_JOB_REQUEST });
    try {
      const response = await api.get(id ? `/requisition/${id}` : `/requisition/`);
      dispatch({
        type: id ? GET_JOB_BY_ID_SUCCESS : GET_JOB_SUCCESS,
        payload: response.data
      });
      return response;
    } catch (error) {
      let errorMessage = 'Failed to login';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: id ? GET_JOB_BY_ID_FAILURE : GET_JOB_FAILURE,
        payload: errorMessage
      });
      return error;
    }
  };
};

export const resetJobById = () => {
  return async (dispatch: Dispatch<JobActionTypes>) => {
    dispatch({ type: GET_JOB_BY_ID_REQUEST });
    try {
      localStorage.removeItem('requisitionId');
      localStorage.removeItem('currentStep');
      dispatch({
        type: GET_JOB_BY_ID_SUCCESS,
        payload: []
      });
    } catch (error) {
      let errorMessage = 'Failed to load!';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: GET_JOB_BY_ID_FAILURE,
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

export const getPositions = (filters?: any) => {
  return async (dispatch: Dispatch<JobActionTypes>) => {
    dispatch({ type: GET_POSITION_REQUEST });
    try {
      const response = await api.get(`/position/get-all?${filters}`);
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

export const savePosition = (data: any) => {
  return async (dispatch: Dispatch<JobActionTypes>) => {
    dispatch({ type: POST_POSITION_REQUEST });
    try {
      const response = await api.post(`/position/add`, data);
      dispatch({
        type: POST_POSITION_SUCCESS,
        payload: response.data
      });
      return response;
    } catch (error) {
      let errorMessage = 'Failed to login';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: POST_POSITION_FAILURE,
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

export const getOrganisation = () => {
  return async (dispatch: Dispatch<JobActionTypes>) => {
    dispatch({ type: GET_ORGANISATION_REQUEST });
    try {
      const response = await api.get(`/organisation/`);
      dispatch({
        type: GET_ORGANISATION_SUCCESS,
        payload: response.data
      });
      return response;
    } catch (error) {
      let errorMessage = 'Failed to login';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: GET_ORGANISATION_FAILURE,
        payload: errorMessage
      });
      return error;
    }
  };
};

export const saveOrganisation = (data: any) => {
  return async (dispatch: Dispatch<JobActionTypes>) => {
    dispatch({ type: SAVE_ORGANISATION_REQUEST });
    try {
      const response = await api.post(`/organisation/`, data);
      dispatch({
        type: SAVE_ORGANISATION_SUCCESS,
        payload: response.data
      });
      return response;
    } catch (error) {
      let errorMessage = 'Failed to login';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: SAVE_ORGANISATION_FAILURE,
        payload: errorMessage
      });
      return error;
    }
  };
};

export const saveManagerReview = (data: any) => {
  return async (dispatch: Dispatch<JobActionTypes>) => {
    dispatch({ type: SAVE_MANAGER_REVIEW_REQUEST });
    try {
      const response = await api.post(`/requisition/manager_review/add`, data);
      dispatch({
        type: SAVE_MANAGER_REVIEW_SUCCESS,
        payload: response.data
      });
      return response;
    } catch (error) {
      let errorMessage = 'Failed to login';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: SAVE_MANAGER_REVIEW_FAILURE,
        payload: errorMessage
      });
      return error;
    }
  };
};

export const saveRecruiterLeadReview = (data: any) => {
  return async (dispatch: Dispatch<JobActionTypes>) => {
    dispatch({ type: SAVE_RECRUITER_LEAD_REQUEST });
    try {
      const response = await api.post(`/requisition/recruiter_team_lead/add`, data);
      dispatch({
        type: SAVE_RECRUITER_LEAD_SUCCESS,
        payload: response.data
      });
      return response;
    } catch (error) {
      let errorMessage = 'Failed to login';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: SAVE_RECRUITER_LEAD_FAILURE,
        payload: errorMessage
      });
      return error;
    }
  };
};

export const saveRecruiterReview = (data: any) => {
  return async (dispatch: Dispatch<JobActionTypes>) => {
    dispatch({ type: SAVE_RECRUITER_REVIEW_REQUEST });
    try {
      const response = await api.post(`/requisition/recruiter_review/add`, data);
      dispatch({
        type: SAVE_RECRUITER_REVIEW_SUCCESS,
        payload: response.data
      });
      return response;
    } catch (error) {
      let errorMessage = 'Failed to login';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: SAVE_RECRUITER_REVIEW_FAILURE,
        payload: errorMessage
      });
      return error;
    }
  };
};

export const saveFinalReview = (data: any) => {
  return async (dispatch: Dispatch<JobActionTypes>) => {
    dispatch({ type: SAVE_FINAL_REVIEW_REQUEST });
    try {
      const response = await api.post(`/requisition/completed/add`, data);
      dispatch({
        type: SAVE_FINAL_REVIEW_SUCCESS,
        payload: response.data
      });
      return response;
    } catch (error) {
      let errorMessage = 'Failed to login';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: SAVE_FINAL_REVIEW_FAILURE,
        payload: errorMessage
      });
      return error;
    }
  };
};