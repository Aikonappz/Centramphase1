import api from "../../api";
import { Dispatch } from 'redux';

export const POST_JOBPOST_REQUEST = 'POST_JOBPOST_REQUEST';
export const POST_JOBPOST_SUCCESS = 'POST_JOBPOST_SUCCESS';
export const POST_JOBPOST_FAILURE = 'POST_JOBPOST_FAILURE';

export const GET_ALL_JOBPOST_REQUEST = 'GET_ALL_JOBPOST_REQUEST';
export const GET_ALL_JOBPOST_SUCCESS = 'GET_ALL_JOBPOST_SUCCESS';
export const GET_ALL_JOBPOST_FAILURE = 'GET_ALL_JOBPOST_FAILURE';

export const GET_JOBPOST_STATUS_REQUEST = 'GET_JOBPOST_STATUS_REQUEST';
export const GET_JOBPOST_STATUS_SUCCESS = 'GET_JOBPOST_STATUS_SUCCESS';
export const GET_JOBPOST_STATUS_FAILURE = 'GET_JOBPOST_STATUS_FAILURE';

export const UPDATE_JOBPOST_STATUS_REQUEST = 'UPDATE_JOBPOST_STATUS_REQUEST';
export const UPDATE_JOBPOST_STATUS_SUCCESS = 'UPDATE_JOBPOST_STATUS_SUCCESS';
export const UPDATE_JOBPOST_STATUS_FAILURE = 'UPDATE_JOBPOST_STATUS_FAILURE';

export const CANDIDATE_REGISTER_JOBPORTAL_REQUEST = 'CANDIDATE_REGISTER_JOBPORTAL_REQUEST';
export const CANDIDATE_REGISTER_JOBPORTAL_SUCCESS = 'CANDIDATE_REGISTER_JOBPORTAL_SUCCESS';
export const CANDIDATE_REGISTER_JOBPORTAL_FAILURE = 'CANDIDATE_REGISTER_JOBPORTAL_FAILURE';

export const CANDIDATE_LOGIN_JOBPORTAL_REQUEST = 'CANDIDATE_LOGIN_JOBPORTAL_REQUEST';
export const CANDIDATE_LOGIN_JOBPORTAL_SUCCESS = 'CANDIDATE_LOGIN_JOBPORTAL_SUCCESS';
export const CANDIDATE_LOGIN_JOBPORTAL_FAILURE = 'CANDIDATE_LOGIN_JOBPORTAL_FAILURE';


interface PostJobRequestAction {
    type: typeof POST_JOBPOST_REQUEST;
}
interface PostJobSuccessAction {
    type: typeof POST_JOBPOST_SUCCESS;
    payload: any;
}
interface PostJobFailureAction {
    type: typeof POST_JOBPOST_FAILURE;
    payload: string;
}
interface UpdatePostJobRequestAction {
    type: typeof UPDATE_JOBPOST_STATUS_REQUEST;
}
interface UpdatePostJobSuccessAction {
    type: typeof UPDATE_JOBPOST_STATUS_SUCCESS;
    payload: any;
}
interface UpdatePostJobFailureAction {
    type: typeof UPDATE_JOBPOST_STATUS_FAILURE;
    payload: string;
}
interface GetAllJobRequestAction {
    type: typeof GET_ALL_JOBPOST_REQUEST;
}
interface GetAllJobSuccessAction {
    type: typeof GET_ALL_JOBPOST_SUCCESS;
    payload: any;
}
interface GetAllJobFailureAction {
    type: typeof GET_ALL_JOBPOST_FAILURE;
    payload: string;
}
interface GetJobPostStatusRequestAction {
    type: typeof GET_JOBPOST_STATUS_REQUEST;
}
interface GetJobPostStatusSuccessAction {
    type: typeof GET_JOBPOST_STATUS_SUCCESS;
    payload: any;
}
interface GetJobPostStatusFailureAction {
    type: typeof GET_JOBPOST_STATUS_FAILURE;
    payload: string;
}
interface CandidateRegisterJobPortalRequestAction {
    type: typeof CANDIDATE_REGISTER_JOBPORTAL_REQUEST;
}
interface CandidateRegisterJobPortalSuccessAction {
    type: typeof CANDIDATE_REGISTER_JOBPORTAL_SUCCESS;
    payload: any;
}
interface CandidateRegisterJobPortalFailureAction {
    type: typeof CANDIDATE_REGISTER_JOBPORTAL_FAILURE;
    payload: string;
}
interface CandidateLoginJobPortalRequestAction {
    type: typeof CANDIDATE_LOGIN_JOBPORTAL_REQUEST;
}
interface CandidateLoginJobPortalSuccessAction {
    type: typeof CANDIDATE_LOGIN_JOBPORTAL_SUCCESS;
    payload: any;
}
interface CandidateLoginJobPortalFailureAction {
    type: typeof CANDIDATE_LOGIN_JOBPORTAL_FAILURE;
    payload: string;
}



export type PostJobActionTypes =
    | PostJobRequestAction
    | PostJobSuccessAction
    | PostJobFailureAction
    | UpdatePostJobRequestAction
    | UpdatePostJobSuccessAction
    | UpdatePostJobFailureAction
    | GetAllJobRequestAction
    | GetAllJobSuccessAction
    | GetAllJobFailureAction
    | GetJobPostStatusRequestAction
    | GetJobPostStatusSuccessAction
    | GetJobPostStatusFailureAction
    | CandidateRegisterJobPortalRequestAction
    | CandidateRegisterJobPortalSuccessAction
    | CandidateRegisterJobPortalFailureAction
    | CandidateLoginJobPortalFailureAction
    | CandidateLoginJobPortalFailureAction
    | CandidateLoginJobPortalFailureAction;


export const postJobportal = (payload: any) => {
    return async (dispatch: any) => {
        dispatch({ type: POST_JOBPOST_REQUEST });

        try {
            const response = await api.post(
                `/job-postings/save`,
                payload
            );
            dispatch({
                type: POST_JOBPOST_SUCCESS,
                payload: response.data,
            });

            return response; // success
        } catch (error: any) {
            const message =
                error?.response?.data?.message || "Something went wrong";

            dispatch({
                type: POST_JOBPOST_FAILURE,
                payload: message,
            });

            throw error;
        }
    };
};

export const updateJobportal = (payload: any) => {
    return async (dispatch: any) => {
        dispatch({ type: UPDATE_JOBPOST_STATUS_REQUEST });

        try {
            const response = await api.put(
                `/job-postings/update`,
                payload
            );
            dispatch({
                type: UPDATE_JOBPOST_STATUS_SUCCESS,
                payload: response.data,
            });

            return response; // success
        } catch (error: any) {
            const message =
                error?.response?.data?.message || "Something went wrong";

            dispatch({
                type: UPDATE_JOBPOST_STATUS_FAILURE,
                payload: message,
            });

            throw error;
        }
    };
};


export const getAllJobPostLists = () => {
    return async (dispatch: Dispatch<PostJobActionTypes>): Promise<any[]> => {
        dispatch({ type: GET_ALL_JOBPOST_REQUEST });
        try {
            const response = await api.get(`/job-postings/get-all`);

            dispatch({
                type: GET_ALL_JOBPOST_SUCCESS,
                payload: response.data
            });

            return response.data; // ✅ RETURN ARRAY, NOT AXIOS RESPONSE
        } catch (error) {
            let errorMessage = 'Failed to login';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            dispatch({
                type: GET_ALL_JOBPOST_FAILURE,
                payload: errorMessage
            });
            throw error; // ✅ don't return error object
        }
    };
};

export const fetchPostedJobDetails = (jobId: number) => {
    return async (dispatch: any) => {
        dispatch({ type: GET_JOBPOST_STATUS_REQUEST });
        try {
            const response = await api.get(`/job-postings/get-status/${jobId}`);

            dispatch({
                type: GET_JOBPOST_STATUS_SUCCESS,
                payload: response.data,
            });

            return response; // success
        } catch (error: any) {
            const message =
                error?.response?.data?.message || "Something went wrong";

            dispatch({
                type: GET_JOBPOST_STATUS_FAILURE,
                payload: message,
            });

            throw error; // 🔥 IMPORTANT
        }
    };
};

// Candidate Register for JobPostPortal
export const candidateRegisterJobPortal = (payload: any) => {
    return async (dispatch: any) => {
        dispatch({ type: CANDIDATE_REGISTER_JOBPORTAL_REQUEST });

        try {
            const response = await api.post(
                `/job-portal/register`,
                payload
            );
            dispatch({
                type: CANDIDATE_REGISTER_JOBPORTAL_SUCCESS,
                payload: response.data,
            });

            return response; // success
        } catch (error: any) {
            const message =
                error?.response?.data?.message || "Something went wrong";

            dispatch({
                type: CANDIDATE_REGISTER_JOBPORTAL_FAILURE,
                payload: message,
            });

            throw error;
        }
    };
};

// Candidate Login for JobPostPortal
export const candidateloginJobPortal = (payload: {
  email: string;
  password: string;
}) => {
  return async (dispatch: any) => {
    dispatch({ type: CANDIDATE_LOGIN_JOBPORTAL_REQUEST });

    try {
      const response = await api.post(
        "/job-portal/login",
        payload
      );

      dispatch({
        type: CANDIDATE_LOGIN_JOBPORTAL_SUCCESS,
        payload: response.data,
      });

      return response; // ✅ success
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Invalid email or password";

      dispatch({
        type: CANDIDATE_LOGIN_JOBPORTAL_FAILURE,
        payload: message,
      });

      throw error;
    }
  };
};
