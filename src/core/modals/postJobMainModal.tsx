import React, { useState, useEffect } from "react";

type PostJobData = {
    jobPortalCareerSite: string;
    jobPortalPostingStartDate: string;
    jobPortalPostingEndDate: string;
    repostAfterExpiration: boolean;
};

type Props = {
    onClose: () => void;
    onSubmit: (data: PostJobData) => void;
    initialData?: PostJobData; // 👈 optional
};

const PostJobMainModal: React.FC<Props> = ({ onClose, onSubmit, initialData }) => {
    const emptyForm: PostJobData = {
        jobPortalCareerSite: "",
        jobPortalPostingStartDate: "",
        jobPortalPostingEndDate: "",
        repostAfterExpiration: false,
    };

    const [formData, setFormData] = useState<PostJobData>(emptyForm);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);   // EDIT
        } else {
            setFormData(emptyForm);    // CREATE (reset)
        }
    }, [initialData]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        });
    };

    const isSubmitDisabled =
        !formData.jobPortalCareerSite ||
        !formData.jobPortalPostingStartDate ||
        !formData.jobPortalPostingEndDate;

    const handleSubmit = () => {
        onSubmit(formData);
    };

    return (
        <div className="modal show d-block">
            <div className="modal-dialog modal-dialog-centered modal-md">
                <div className="modal-content bg-gray-200">
                    <div className="modal-body">

                        <h4 className="mb-3 text-center">Post Job Details</h4>

                        {/* Internal Career Site */}
                        <div className="mb-3">
                            <label className="form-label">Internal Career Site</label>
                            <select
                                name="jobPortalCareerSite"
                                className="form-select"
                                value={formData.jobPortalCareerSite}
                                onChange={handleChange}
                            >
                                <option value="">Select Site</option>
                                <option value="Internal Portal">Internal Portal</option>
                                <option value="Company Website">Company Website</option>
                                <option value="Intranet">Intranet</option>
                            </select>
                        </div>

                        {/* Posting Start Date */}
                        <div className="mb-3">
                            <label className="form-label">Posting Start Date</label>
                            <input
                                type="date"
                                name="jobPortalPostingStartDate"
                                className="form-control"
                                value={formData.jobPortalPostingStartDate}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Posting End Date */}
                        <div className="mb-3">
                            <label className="form-label">Posting End Date</label>
                            <input
                                type="date"
                                name="jobPortalPostingEndDate"
                                className="form-control"
                                value={formData.jobPortalPostingEndDate}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Repost after expiration */}
                        <div className="form-check mb-4">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="repostAfterExpiration"
                                checked={formData.repostAfterExpiration}
                                onChange={handleChange}
                                id="repostCheck"
                            />
                            <label className="form-check-label" htmlFor="repostCheck">
                                Repost after expiration
                            </label>
                        </div>

                        {/* Buttons */}
                        <div className="d-flex justify-content-end gap-2">
                            <button className="btn btn-secondary" onClick={onClose}>
                                Cancel
                            </button>
                            <button className="btn btn-primary" onClick={handleSubmit} disabled={isSubmitDisabled}>
                                Post Job
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostJobMainModal;
