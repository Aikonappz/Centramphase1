import JobAppsPortal from "../recruitment/jobAppsPortal/JobAppsPortal";
import PortalLogin from "../recruitment/jobAppsPortal/PortalLogin";
import PortalCreateAccount from "../recruitment/jobAppsPortal/PortalCreateAccount";
import PortalApplyJob from "../recruitment/jobAppsPortal/PortalApplyJob";

export const portalRoutes = [
  {
    path: "/job-portal",
    element: <JobAppsPortal />,
  },
  {
    path: "/job-portal/login",
    element: <PortalLogin />,
  },
  {
    path: "/job-portal/create-account",
    element: <PortalCreateAccount />,
  },
  {
    path: "/job-portal/apply-job",
    element: <PortalApplyJob />,
  },
];
