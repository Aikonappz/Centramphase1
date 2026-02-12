import React from "react";

type Props = {
  message: string;
  onClose: () => void;
};

const JobPostAlertModal: React.FC<Props> = ({ message, onClose }) => {
  return (
    <div className="modal show d-block">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content bg-gray-200">
          <div className="modal-body text-center">

            <h4 className="mb-3">Reminder</h4>

            <p className="mb-4">{message}</p>

            <button className="btn btn-primary" onClick={onClose}>
              OK
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostAlertModal;
