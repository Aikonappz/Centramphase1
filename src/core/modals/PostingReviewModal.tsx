import React, { useState } from "react";

type Props = {
    onClose: () => void;
    onPreview: (postType: "INTERNAL" | "EXTERNAL" | "AGENT") => void;
};

const PostingReviewModal: React.FC<Props> = ({ onClose, onPreview }) => {
    const [postType, setPostType] = useState<
        "INTERNAL" | "EXTERNAL" | "AGENT" | null
    >(null);

    return (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
            <div className="modal-dialog modal-sm modal-dialog-centered">
                <div className="modal-content rounded-4">

                    <div className="modal-header">
                        <h5 className="modal-title">Posting Review</h5>
                        <button className="btn-close" onClick={onClose}></button>
                    </div>

                    <div className="modal-body">
                        <label className="form-label fw-semibold">
                            Select Posting Type
                        </label>

                        <select
                            className="form-select"
                            value={postType ?? ""}
                            onChange={(e) =>
                                setPostType(e.target.value as "INTERNAL" | "EXTERNAL" | "AGENT")
                            }
                        >
                            <option value="">-- Select --</option>
                            <option value="INTERNAL">Internal Post</option>
                            <option value="EXTERNAL">External Post</option>
                            <option value="AGENT">Agent Post</option>
                        </select>
                    </div>

                    <div className="modal-footer d-flex justify-content-end gap-3 px-4 py-3">
                        <button className="btn btn-secondary" onClick={onClose}>
                            Cancel
                        </button>

                        <button
                            className="btn btn-info"
                            disabled={!postType}
                            onClick={() => postType && onPreview(postType)}
                        >
                            Preview
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PostingReviewModal;
