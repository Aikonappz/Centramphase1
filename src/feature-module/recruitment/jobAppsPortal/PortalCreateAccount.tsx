import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./PortalCreateAccount.scss";
import { useAppDispatch } from '../../../core/data/redux/store'
import { candidateRegisterJobPortal } from '../../../core/data/redux/actions/postJobActions'
import { useLocation } from "react-router-dom";


export default function PortalCreateAccount() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const jobId = location.state?.jobId;
  const jobTitle = location.state?.jobTitle;

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerCandidate();
  };


  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };


  const registerCandidate = async () => {
    try {
      const payload = {
        username: formData.fullName,
        email: formData.email,
        password: formData.password,
        // rememberMe: false
      };

      const response: any = await dispatch(
        candidateRegisterJobPortal(payload)
      );

      if (response?.status === 200) {
        setTimeout(() => {
          // navigate("/job-portal/login");
          navigate("/job-portal/login", { state: { jobId: jobId, jobTitle: jobTitle }, })
        }, 700);
      }
    } catch (error: any) {
      const apiMessage =
        error?.response?.data?.message ||
        "Candidate registration failed";
      alert(apiMessage);
    }
  };


  return (
    <div className="portal-auth-wrapper reverse">

      {/* IMAGE SIDE */}
      <div className="portal-auth-left">
        <div className="left-content">
          <h1>Join Us<br />Today!</h1>
          <p>Create your account and start applying for jobs.</p>

          <img
            src="/assets/img/bg/authentication-bg-08.svg"
            alt="illustration"
          />
        </div>
      </div>

      {/* FORM SIDE */}
      <div className="portal-auth-right">
        {/* Top Center Logo */}
        <div className="auth-logo">
          <img src="/assets/img/logo.svg" alt="Company Logo" />
        </div>

        {/* Centered Title Section */}
        <div className="auth-content">
          <div className="auth-header">
            <h2>Sign Up</h2>
            <p>Please enter your details to sign up</p>
          </div>

          <form onSubmit={handleCreate}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit">Create Account</button>

            <div className="divider">OR</div>

            <button
              type="button"
              className="secondary-btn"
              onClick={() => navigate("/job-portal/login")}
            >
              Already have an account? Log In
            </button>
          </form>
        </div>
        {/* Footer */}
        <div className="auth-footer">
          Copyright © 2025 - Centram
        </div>
      </div>

    </div>
  );
}
