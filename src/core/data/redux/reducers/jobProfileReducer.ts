
import { CREATE_COMPENTANCY_FAILURE, CREATE_COMPENTANCY_REQUEST, CREATE_COMPENTANCY_SUCCESS, CREATE_JOB_FAMILY_FAILURE, CREATE_JOB_FAMILY_REQUEST, CREATE_JOB_FAMILY_SUCCESS, CREATE_JOB_PROFILE_FAILURE, CREATE_JOB_PROFILE_REQUEST, CREATE_JOB_PROFILE_SUCCESS, CREATE_JOB_ROLE_FAILURE, CREATE_JOB_ROLE_REQUEST, CREATE_JOB_ROLE_SUCCESS, GET_COMPENTANCY_FAILURE, GET_COMPENTANCY_REQUEST, GET_COMPENTANCY_SUCCESS, GET_JOB_FAMILY_FAILURE, GET_JOB_FAMILY_REQUEST, GET_JOB_FAMILY_SUCCESS, GET_JOB_PROFILE_FAILURE, GET_JOB_PROFILE_REQUEST, GET_JOB_PROFILE_SUCCESS, GET_JOB_ROLE_FAILURE, GET_JOB_ROLE_REQUEST, GET_JOB_ROLE_SUCCESS, JobProfileActionTypes } from '../actions/jobProfileActions';

export interface JobProfileState {
    jobList: any | null;
    loading: boolean;
    error: string | null;
    jobProfile: any | null;
    compentencyList: any | null;
    jobRoleById: any | null;
    jobFamilyById: any | null;
    division: any | null;
    businessUnit: any | null;
    department: any | null;
    organisation: any | null;
    jobById: any | null;
    jobFamilyList: any | null;
    jobRoleList: any | null;
}

const initialState: JobProfileState = {
    jobList: null,
    loading: false,
    error: null,
    jobProfile: null,
    compentencyList: null,
    jobRoleById: null,
    jobFamilyById: null,
    division: null,
    businessUnit: null,
    department: null,
    organisation: null,
    jobById: null,
    jobFamilyList: null,
    jobRoleList: null
};

export const jobProfileReducer = (state: JobProfileState = initialState, action: JobProfileActionTypes): JobProfileState => {
    switch (action.type) {
        case GET_JOB_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case GET_JOB_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                jobProfile: action.payload,
                error: null
            };
        case GET_JOB_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CREATE_JOB_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case CREATE_JOB_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                jobProfile: action.payload,
                error: null
            };
        case CREATE_JOB_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CREATE_COMPENTANCY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case CREATE_COMPENTANCY_SUCCESS:
            return {
                ...state,
                loading: false,
                compentencyList: action.payload,
                error: null
            };
        case CREATE_COMPENTANCY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case GET_COMPENTANCY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case GET_COMPENTANCY_SUCCESS:
            return {
                ...state,
                loading: false,
                compentencyList: action.payload,
                error: null
            };
        case GET_COMPENTANCY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CREATE_JOB_FAMILY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case CREATE_JOB_FAMILY_SUCCESS:
            return {
                ...state,
                loading: false,
                jobFamilyList: action.payload,
                error: null
            };
        case CREATE_JOB_FAMILY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case GET_JOB_FAMILY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case GET_JOB_FAMILY_SUCCESS:
            return {
                ...state,
                loading: false,
                jobFamilyList: action.payload,
                error: null
            };
        case GET_JOB_FAMILY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CREATE_JOB_ROLE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case CREATE_JOB_ROLE_SUCCESS:
            return {
                ...state,
                loading: false,
                jobRoleList: action.payload,
                error: null
            };
        case CREATE_JOB_ROLE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case GET_JOB_ROLE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case GET_JOB_ROLE_SUCCESS:
            return {
                ...state,
                loading: false,
                jobRoleList: action.payload,
                error: null
            };
        case GET_JOB_ROLE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};