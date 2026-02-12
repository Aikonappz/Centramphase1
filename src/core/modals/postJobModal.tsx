import React, { useState } from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../feature-module/router/all_routes";
import PostingReviewModal from "./PostingReviewModal";
import JobPreviewModal from "./JobPreviewModal";

type Props = {
  onClose: () => void;
  onPostJob: () => void;
  onEditJob: () => void;
  onPreviewJob: () => void;
};

export type JobPreview = {
  title: string;
  locations: string[];
  refCode: string;
  postedOn: string;
  experienceLevel: string;
  contractType: string;
  businessUnit: string;
  brand: string;
  description: string;
  profile: string[];
  preferred: string[];
  perks: string[];
  aboutCompany: string;
};

const mockJobData: JobPreview = {
  title: "Senior Fullstack Developer (Java + Angular)",
  locations: ["Katowice", "Warszawa", "Wrocław", "Poznań", "Kraków"],
  refCode: "309847-en_GB",
  postedOn: "18 Aug 2025",
  experienceLevel: "Experienced Professionals",
  contractType: "Permanent",
  businessUnit: "FS",
  brand: "Capgemini",
  description:
    "You will be responsible for designing, developing, and maintaining modern full-stack applications using Java and Angular in an agile environment.",
  profile: [
    "Minimum 4+ years of experience as a Full Stack Java Developer",
    "Strong proficiency in Java, Spring Boot, Hibernate",
    "Hands-on experience with Angular / React / Vue",
    "Experience with REST APIs and microservices"
  ],
  preferred: [
    "Experience with CI/CD pipelines (Jenkins, GitLab)",
    "Cloud exposure (AWS / Azure / GCP)",
    "Good communication skills in English (C1)"
  ],
  perks: [
    "Private medical care",
    "Hybrid work model",
    "Annual performance bonus",
    "Learning & certification budget"
  ],
  aboutCompany:
    "Capgemini is a global leader in partnering with companies to transform and manage their business by harnessing the power of technology."
};


const JobPostingModal: React.FC<Props> = ({
  onClose,
  onPostJob,
  onEditJob,
  onPreviewJob,
}) => {
  const [showReview, setShowReview] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [postType, setPostType] = useState<"INTERNAL" | "EXTERNAL" | "AGENT">("INTERNAL");


  type PostType = "INTERNAL" | "EXTERNAL" | "AGENT";

  const getJobDataByType = (type: PostType): JobPreview => {
    switch (type) {
      case "INTERNAL":
        return {
          ...mockJobData,
          perks: [...mockJobData.perks, "Internal mobility & referral benefits"]
        };

      case "AGENT":
        return {
          ...mockJobData,
          contractType: "Third Party / Agent"
        };

      case "EXTERNAL":
      default:
        return mockJobData;
    }
  };


  return (
    <div className="modal show d-block">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content bg-gray-200">
          <div className="modal-body text-center">

            <h4 className="mb-2">Job Action Required</h4>

            <p className="mb-4">
              {/* Do you want to post this job now, or edit the job details already
              posted? */}
              Do you want to proceed with posting this job, or modify the existing posting details?
            </p>

            <div className="d-flex justify-content-center gap-2 flex-wrap">
              <button
                className="btn btn-info"
                onClick={() => setShowReview(true)}
              >
                {/* Posting <br/>Preview */}
                Posting Preview
              </button>

              {/* 🔵 Post Job */}
              <button
                className="btn btn-primary"
                onClick={onPostJob}
              >
                Post Job
              </button>

              {/* ⚪ Edit Job */}
              <button
                className="btn btn-secondary"
                onClick={onEditJob}
              >
                Edit Job
              </button>

              {/* 🔴 Cancel */}
              <button
                className="btn btn-danger"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      </div>
      {showReview && (
        <PostingReviewModal
          onClose={() => setShowReview(false)}
          onPreview={(type) => {
            setPostType(type);
            setShowReview(false);
            setShowPreview(true);
          }}
        />
      )}

      {showPreview && (
        <JobPreviewModal
          onClose={() => setShowPreview(false)}
          job={getJobDataByType(postType)}
        />
      )}
    </div>
  );
};

export default JobPostingModal;
