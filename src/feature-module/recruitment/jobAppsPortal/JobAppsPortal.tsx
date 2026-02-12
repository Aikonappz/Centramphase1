import "./JobAppsPortal.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch } from '../../../core/data/redux/store'
import { getAllJobPostLists } from '../../../core/data/redux/actions/postJobActions'
import { Spin } from "antd";


// ===== API RESPONSE INTERFACE =====
interface JobPostApi {
  id: number;
  requisitionId: number;
  jobTitle: string;
  locationId: number;
  postingStartDate: string;
  postingEndDate: string;
  postingType: string;
  postingBoard: string;
  postingStatus: string;
}

// ===== UI MODEL =====
type Job = {
  id: number;
  title: string;
  location: string;
  salary: string;
  experience: string;
  level: string;
  filled: number;
  total: number;
};

export default function JobAppsPortal() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [jobPostList, setJobPostList] = useState<JobPostApi[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // ===== FETCH JOB POSTS =====
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500)); // ⏳ delay
        const data = await dispatch(getAllJobPostLists());
        setJobPostList(data || []);
      } catch (error) {
        console.error("Failed to fetch job postings", error);
        setJobPostList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [dispatch]);


  // ===== MAP API → UI =====
  const jobs: Job[] = jobPostList.map((item) => ({
    id: item.id,
    title: item.jobTitle,
    location: `Location ID: ${item.locationId}`,
    salary: "Not disclosed",
    experience: "2+ years",
    level: item.postingType || "Any",
    filled: 0,
    total: 25,
  }));

  const handleApply = (id: number, title: string) => {
    navigate("/job-portal/login", {
      state: { jobId: id, jobTitle: title },
    });
  };

  return (
    <div className="job-portal-wrapper">

      {/* Top Search Section */}
      <div className="job-search-bar">

        <div className="search-left">
          <img src="/assets/img/logo.svg" alt="Company Logo" className="company-logo" />
        </div>

        <div className="search-right">
          <input type="text" placeholder="Search jobs (e.g. Java)" />
          <button>Search</button>
        </div>

      </div>

      <div className="job-content">

        {/* LEFT – Job List */}
        <div className="job-feed">
          {loading && <Spin tip="Loading" size="large" fullscreen />}
          {!loading && jobs.length === 0 && (
            <p className="no-data-text">No job postings available</p>
          )}

          {!loading &&
            jobs.map((job) => (
              <div key={job.id} className="job-post">

                <div className="post-header">
                  <div>
                    <h3>{job.title}</h3>
                    <p className="job-location">{job.location}</p>
                  </div>
                  <span className="level">{job.level}</span>
                </div>

                <div className="post-body">
                  <p>{job.salary}</p>
                  <p>{job.experience}</p>
                </div>

                <div className="post-footer">
                  <button
                    className="job-post-button"
                    onClick={() => handleApply(job.id, job.title)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* RIGHT – Filters Sidebar (UI Only) */}
        <div className="job-filters">
          <h4>Filters</h4>

          <div className="filter-section">
            <h5>Experience Level</h5>
            <label><input type="checkbox" /> Experienced Professionals</label>
            <label><input type="checkbox" /> Executives</label>
          </div>

          <div className="filter-section">
            <h5>Location</h5>
            <label><input type="checkbox" /> Bangalore</label>
            <label><input type="checkbox" /> Mumbai</label>
            <label><input type="checkbox" /> Chennai</label>
          </div>
        </div>

      </div>
    </div>
  );
}
