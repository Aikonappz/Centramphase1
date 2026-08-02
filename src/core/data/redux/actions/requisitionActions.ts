import api from '../../api';
import { Dispatch } from 'redux';

// Action types
export const POST_JOB_REQUEST = 'POST_JOB_REQUEST';
export const POST_JOB_SUCCESS = 'POST_JOB_SUCCESS';
export const POST_JOB_FAILURE = 'POST_JOB_FAILURE';
export const BLANK_POST_JOB_REQUEST = 'BLANK_POST_JOB_REQUEST';

export const GET_JOB_REQUEST = 'GET_JOB_REQUEST';
export const GET_JOB_SUCCESS = 'GET_JOB_SUCCESS';
export const GET_JOB_FAILURE = 'GET_JOB_FAILURE';

export const GET_JOB_BY_ID_REQUEST = 'GET_JOB_BY_ID_REQUEST';
export const GET_JOB_BY_ID_SUCCESS = 'GET_JOB_BY_ID_SUCCESS';
export const GET_JOB_BY_ID_FAILURE = 'GET_JOB_BY_ID_FAILURE';

export const GET_MANAGER_REVIEW_BY_ID_REQUEST = 'GET_MANAGER_REVIEW_BY_ID_REQUEST';
export const GET_MANAGER_REVIEW_BY_ID_SUCCESS = 'GET_MANAGER_REVIEW_BY_ID_SUCCESS';
export const GET_MANAGER_REVIEW_BY_ID_FAILURE = 'GET_MANAGER_REVIEW_BY_ID_FAILURE';

export const GET_RECRUITER_TEAM_LEAD_BY_ID_REQUEST = 'GET_RECRUITER_TEAM_LEAD_BY_ID_REQUEST';
export const GET_RECRUITER_TEAM_LEAD_BY_ID_SUCCESS = 'GET_RECRUITER_TEAM_LEAD_BY_ID_SUCCESS';
export const GET_RECRUITER_TEAM_LEAD_BY_ID_FAILURE = 'GET_RECRUITER_TEAM_LEAD_BY_ID_FAILURE';

export const GET_RECRUITER_REVIEW_BY_ID_REQUEST = 'GET_RECRUITER_REVIEW_BY_ID_REQUEST';
export const GET_RECRUITER_REVIEW_BY_ID_SUCCESS = 'GET_RECRUITER_REVIEW_BY_ID_SUCCESS';
export const GET_RECRUITER_REVIEW_BY_ID_FAILURE = 'GET_RECRUITER_REVIEW_BY_ID_FAILURE';

export const DELETE_JOB_REQUEST = 'DELETE_JOB_REQUEST';
export const DELETE_JOB_SUCCESS = 'DELETE_JOB_SUCCESS';
export const DELETE_JOB_FAILURE = 'DELETE_JOB_FAILURE';

export const UPDATE_JOB_REQUEST = 'UPDATE_JOB_REQUEST';
export const UPDATE_JOB_SUCCESS = 'UPDATE_JOB_SUCCESS';
export const UPDATE_JOB_FAILURE = 'UPDATE_JOB_FAILURE';

export const GET_POSITION_NEXT_CODE_REQUEST = 'GET_POSITION_NEXT_CODE_REQUEST';
export const GET_POSITION_NEXT_CODE_SUCCESS = 'GET_POSITION_NEXT_CODE_SUCCESS';
export const GET_POSITION_NEXT_CODE_FAILURE = 'GET_POSITION_NEXT_CODE_FAILURE';

export const GET_REQUISITION_NEXT_CODE_REQUEST = 'GET_REQUISITION_NEXT_CODE_REQUEST';
export const GET_REQUISITION_NEXT_CODE_SUCCESS = 'GET_REQUISITION_NEXT_CODE_SUCCESS';
export const GET_REQUISITION_NEXT_CODE_FAILURE = 'GET_REQUISITION_NEXT_CODE_FAILURE';

export const GET_POSITION_REQUEST = 'GET_POSITION_REQUEST';
export const GET_POSITION_SUCCESS = 'GET_POSITION_SUCCESS';
export const GET_POSITION_FAILURE = 'GET_POSITION_FAILURE';

export const POST_POSITION_REQUEST = 'POST_POSITION_REQUEST';
export const POST_POSITION_SUCCESS = 'POST_POSITION_SUCCESS';
export const POST_POSITION_FAILURE = 'POST_POSITION_FAILURE';

export const GET_POSITION_BY_ID_REQUEST = 'GET_POSITION_BY_ID_REQUEST';
export const GET_POSITION_BY_ID_SUCCESS = 'GET_POSITION_BY_ID_SUCCESS';
export const GET_POSITION_BY_ID_FAILURE = 'GET_POSITION_BY_ID_FAILURE';

export const GET_POSITION_TEMPLATE_REQUEST = 'GET_POSITION_TEMPLATE_REQUEST';
export const GET_POSITION_TEMPLATE_SUCCESS = 'GET_POSITION_TEMPLATE_SUCCESS';
export const GET_POSITION_TEMPLATE_FAILURE = 'GET_POSITION_TEMPLATE_FAILURE';

export const GET_POSITION_BULK_UPLOAD_REQUEST = 'GET_POSITION_BULK_UPLOAD_REQUEST';
export const GET_POSITION_BULK_UPLOAD_SUCCESS = 'GET_POSITION_BULK_UPLOAD_SUCCESS';
export const GET_POSITION_BULK_UPLOAD_FAILURE = 'GET_POSITION_BULK_UPLOAD_FAILURE';

export const GET_JOB_DETAILS_BY_JOB_CODE_REQUEST = 'GET_JOB_DETAILS_BY_JOB_CODE_REQUEST';
export const GET_JOB_DETAILS_BY_JOB_CODE_SUCCESS = 'GET_JOB_DETAILS_BY_JOB_CODE_SUCCESS';
export const GET_JOB_DETAILS_BY_JOB_CODE_FAILURE = 'GET_JOB_DETAILS_BY_JOB_CODE_FAILURE';

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

export const GET_LOCATION_REQUEST = 'GET_LOCATION_REQUEST';
export const GET_LOCATION_SUCCESS = 'GET_LOCATION_SUCCESS';
export const GET_LOCATION_FAILURE = 'GET_LOCATION_FAILURE';

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

interface BlankPostJobRequestAction {
  type: typeof BLANK_POST_JOB_REQUEST;
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

interface GetManagerReviewByIdRequestAction {
  type: typeof GET_MANAGER_REVIEW_BY_ID_REQUEST;
}

interface GetManagerReviewByIdSuccessAction {
  type: typeof GET_MANAGER_REVIEW_BY_ID_SUCCESS;
  payload: any;
}

interface GetManagerReviewByIdFailureAction {
  type: typeof GET_MANAGER_REVIEW_BY_ID_FAILURE;
  payload: string;
}

interface GetRecruiterTeamLeadByIdRequestAction {
  type: typeof GET_RECRUITER_TEAM_LEAD_BY_ID_REQUEST;
}

interface GetRecruiterTeamLeadByIdSuccessAction {
  type: typeof GET_RECRUITER_TEAM_LEAD_BY_ID_SUCCESS;
  payload: any;
}

interface GetRecruiterTeamLeadByIdFailureAction {
  type: typeof GET_RECRUITER_TEAM_LEAD_BY_ID_FAILURE;
  payload: string;
}

interface GetRecruiterReviewByIdRequestAction {
  type: typeof GET_RECRUITER_REVIEW_BY_ID_REQUEST;
}

interface GetRecruiterReviewByIdSuccessAction {
  type: typeof GET_RECRUITER_REVIEW_BY_ID_SUCCESS;
  payload: any;
}

interface GetRecruiterReviewByIdFailureAction {
  type: typeof GET_RECRUITER_REVIEW_BY_ID_FAILURE;
  payload: string;
}

interface GetPositionNextCodeRequestAction {
  type: typeof GET_POSITION_NEXT_CODE_REQUEST;
}

interface GetPositionNextCodeSuccessAction {
  type: typeof GET_POSITION_NEXT_CODE_SUCCESS;
  payload: any;
}

interface GetPositionNextCodeFailureAction {
  type: typeof GET_POSITION_NEXT_CODE_FAILURE;
  payload: string;
}

interface GetRequisitionNextCodeRequestAction {
  type: typeof GET_REQUISITION_NEXT_CODE_REQUEST;
}

interface GetRequisitionNextCodeSuccessAction {
  type: typeof GET_REQUISITION_NEXT_CODE_SUCCESS;
  payload: any;
}

interface GetRequisitionNextCodeFailureAction {
  type: typeof GET_REQUISITION_NEXT_CODE_FAILURE;
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

interface GetPositionTemplateRequestAction {
  type: typeof GET_POSITION_TEMPLATE_REQUEST;
}

interface GetPositionTemplateSuccessAction {
  type: typeof GET_POSITION_TEMPLATE_SUCCESS;
  payload: any;
}

interface GetPositionTemplateFailureAction {
  type: typeof GET_POSITION_TEMPLATE_FAILURE;
  payload: string;
}

interface GetPositionBulkTemplateRequestAction {
  type: typeof GET_POSITION_BULK_UPLOAD_REQUEST;
}

interface GetPositionBulkTemplateSuccessAction {
  type: typeof GET_POSITION_BULK_UPLOAD_SUCCESS;
  payload: any;
}

interface GetPositionBulkTemplateFailureAction {
  type: typeof GET_POSITION_BULK_UPLOAD_FAILURE;
  payload: string;
}

interface GetJobDetailsByJobCodeRequestAction {
  type: typeof GET_JOB_DETAILS_BY_JOB_CODE_REQUEST;
}

interface GetJobDetailsByJobCodeSuccessAction {
  type: typeof GET_JOB_DETAILS_BY_JOB_CODE_SUCCESS;
  payload: any;
}

interface GetJobDetailsByJobCodeFailureAction {
  type: typeof GET_JOB_DETAILS_BY_JOB_CODE_FAILURE;
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

interface GetLocationRequestAction {
  type: typeof GET_LOCATION_REQUEST;
}

interface GetLocationSuccessAction {
  type: typeof GET_LOCATION_SUCCESS;
  payload: any;
}

interface GetLocationFailureAction {
  type: typeof GET_LOCATION_FAILURE;
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
  | BlankPostJobRequestAction
  | PostJobSuccessAction
  | PostJobFailureAction
  | GetJobRequestAction
  | GetJobSuccessAction
  | GetJobFailureAction
  | GetJobByIdRequestAction
  | GetJobByIdSuccessAction
  | GetJobByIdFailureAction
  | GetManagerReviewByIdRequestAction
  | GetManagerReviewByIdSuccessAction
  | GetManagerReviewByIdFailureAction
  | GetRecruiterTeamLeadByIdRequestAction
  | GetRecruiterTeamLeadByIdSuccessAction
  | GetRecruiterTeamLeadByIdFailureAction
  | GetRecruiterReviewByIdRequestAction
  | GetRecruiterReviewByIdSuccessAction
  | GetRecruiterReviewByIdFailureAction
  | GetPositionNextCodeRequestAction
  | GetPositionNextCodeSuccessAction
  | GetPositionNextCodeFailureAction
  | GetRequisitionNextCodeRequestAction
  | GetRequisitionNextCodeSuccessAction
  | GetRequisitionNextCodeFailureAction
  | GetPositionRequestAction
  | GetPositionSuccessAction
  | GetPositionFailureAction
  | PostPositionRequestAction
  | PostPositionSuccessAction
  | PostPositionFailureAction
  | GetPositionByIdRequestAction
  | GetPositionByIdSuccessAction
  | GetPositionByIdFailureAction
  | GetPositionTemplateRequestAction
  | GetPositionTemplateSuccessAction
  | GetPositionTemplateFailureAction
  | GetPositionBulkTemplateRequestAction
  | GetPositionBulkTemplateSuccessAction
  | GetPositionBulkTemplateFailureAction
  | GetJobDetailsByJobCodeRequestAction
  | GetJobDetailsByJobCodeSuccessAction
  | GetJobDetailsByJobCodeFailureAction
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
  | GetLocationRequestAction
  | GetLocationSuccessAction
  | GetLocationFailureAction
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
  console.log("Requisition Details", data);
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

//Blank template

export const blankpostJob = (data: any) => {
  console.log("Blank Requisition Details", data);
  return async (dispatch: Dispatch<JobActionTypes>) => {
    dispatch({ type: BLANK_POST_JOB_REQUEST });
    try {
      const response = await api.post(`/requisition/blank-template`, data);
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

export const getManagerReviewByRequisitionID = (id?: any) => {
  return async (dispatch: Dispatch<JobActionTypes>) => {
    dispatch({ type: GET_MANAGER_REVIEW_BY_ID_REQUEST });
    try {
      const response = await api.get(`/requisition/manager_review/${id}`);
      dispatch({
        type: GET_MANAGER_REVIEW_BY_ID_SUCCESS,
        payload: response.data
      });
      return response;
    } catch (error) {
      let errorMessage = 'Failed to login';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: GET_MANAGER_REVIEW_BY_ID_FAILURE,
        payload: errorMessage
      });
      return error;
    }
  };
};

export const getRecruiterTeamLeadByRequisitionID = (id?: any) => {
  return async (dispatch: Dispatch<JobActionTypes>) => {
    dispatch({ type: GET_RECRUITER_TEAM_LEAD_BY_ID_REQUEST });
    try {
      const response = await api.get(`/requisition/recruiter_team_lead/${id}`);
      dispatch({
        type: GET_RECRUITER_TEAM_LEAD_BY_ID_SUCCESS,
        payload: response.data
      });
      return response;
    } catch (error) {
      let errorMessage = 'Failed to login';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: GET_RECRUITER_TEAM_LEAD_BY_ID_FAILURE,
        payload: errorMessage
      });
      return error;
    }
  };
};

export const getRecruiterReviewByRequisitionID = (id?: any) => {
  return async (dispatch: Dispatch<JobActionTypes>) => {
    dispatch({ type: GET_RECRUITER_REVIEW_BY_ID_REQUEST });
    try {
      const response = await api.get(`/requisition/recruiter_review/${id}`);
      dispatch({
        type: GET_RECRUITER_REVIEW_BY_ID_SUCCESS,
        payload: response.data
      });
      return response;
    } catch (error) {
      let errorMessage = 'Failed to login';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: GET_RECRUITER_REVIEW_BY_ID_FAILURE,
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

export const getPositionNextCode = () => {
  return async (dispatch: Dispatch<JobActionTypes>) => {
    dispatch({ type: GET_POSITION_NEXT_CODE_REQUEST });

    try {
      const response = await api.get(`/position/next-position-code`);

      dispatch({
        type: GET_POSITION_NEXT_CODE_SUCCESS,
        payload: response.data
      });

      return response;
    } catch (error) {
      let errorMessage = 'Failed to fetch next position code';

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      dispatch({
        type: GET_POSITION_NEXT_CODE_FAILURE,
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

export const getPositionDownloadTemplate = () => {
  return async (dispatch: Dispatch<JobActionTypes>) => {
    dispatch({ type: GET_POSITION_TEMPLATE_REQUEST });

    try {
      const response = await api.get('/position/bulk/template', {
        responseType: 'blob', // IMPORTANT for file download
      });

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;

      // file name (you can change)
      link.setAttribute('download', 'Position_Template.xlsx');

      document.body.appendChild(link);
      link.click();
      link.remove();

      dispatch({
        type: GET_POSITION_TEMPLATE_SUCCESS,
        payload: response.data
      });

      return response;

    } catch (error) {
      let errorMessage = 'Failed to download template';

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      dispatch({
        type: GET_POSITION_TEMPLATE_FAILURE,
        payload: errorMessage
      });

      return error;
    }
  };
};

export const getPositionBulkUpload = (file: File) => {
  return async (dispatch: Dispatch<JobActionTypes>) => {
    dispatch({ type: GET_POSITION_BULK_UPLOAD_REQUEST });

    try {
      const formData = new FormData();
      formData.append('file', file); // backend key must match (usually 'file')

      const response = await api.post('/position/bulk/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      dispatch({
        type: GET_POSITION_BULK_UPLOAD_SUCCESS,
        payload: response.data,
      });

      return response;

    } catch (error) {
      let errorMessage = 'Bulk upload failed';

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      dispatch({
        type: GET_POSITION_BULK_UPLOAD_FAILURE,
        payload: errorMessage,
      });

      return error;
    }
  };
};



export const getJobByJobCode = (id: any) => {
  return async (dispatch: Dispatch<JobActionTypes>) => {
    dispatch({ type: GET_JOB_DETAILS_BY_JOB_CODE_REQUEST });
    try {
      const response = await api.get(`/job-code/${id}`);
      dispatch({
        type: GET_JOB_DETAILS_BY_JOB_CODE_SUCCESS,
        payload: response.data
      });
      return response;
    } catch (error) {
      let errorMessage = 'Failed to login';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: GET_JOB_DETAILS_BY_JOB_CODE_FAILURE,
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

export const getLocations = () => {
  return async (dispatch: Dispatch<JobActionTypes>) => {
    dispatch({ type: GET_LOCATION_REQUEST });
    try {
      const response = await api.get(`/location/`);
      dispatch({
        type: GET_LOCATION_SUCCESS,
        payload: response.data
      });
      return response;
    } catch (error) {
      let errorMessage = 'Failed to login';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: GET_LOCATION_FAILURE,
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

export const getRequisitionNextCode = () => {
  return async (dispatch: Dispatch<JobActionTypes>) => {
    dispatch({ type: GET_REQUISITION_NEXT_CODE_REQUEST });

    try {
      const response = await api.get(`/requisition/next-requisition-code`);

      dispatch({
        type: GET_REQUISITION_NEXT_CODE_SUCCESS,
        payload: response.data
      });

      return response;
    } catch (error) {
      let errorMessage = 'Failed to fetch next position code';

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      dispatch({
        type: GET_REQUISITION_NEXT_CODE_FAILURE,
        payload: errorMessage
      });

      return error;
    }
  };
};