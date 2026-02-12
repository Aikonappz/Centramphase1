import { useNavigate } from "react-router-dom";
import "./PortalLogin.scss";
import { useState } from "react";
import { useAppDispatch } from '../../../core/data/redux/store'
import { candidateloginJobPortal } from '../../../core/data/redux/actions/postJobActions'
import { useLocation } from "react-router-dom";


export default function PortalLogin() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const location = useLocation();
    const jobId = location.state?.jobId;
    const jobTitle = location.state?.jobTitle;

    const [formData, setFormData] = useState({
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


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response: any = await dispatch(
                candidateloginJobPortal({
                    email: formData.email,
                    password: formData.password,
                })
            );

            if (response?.status === 200) {
                // navigate("/job-portal/apply-job")
                navigate("/job-portal/apply-job", { state: { jobId: jobId, jobTitle: jobTitle }, });
            }
        } catch (error) {
            // alert("Error")
            // error already handled in redux
        }
    };
    return (
        <div className="portal-auth-wrapper">

            {/* LEFT PURPLE CURVE */}
            <div className="portal-auth-left">
                <div className="left-content">
                    <h1>Great To See<br />You Again!</h1>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>

                    <img
                        src="/assets/img/bg/authentication-bg-08.svg"
                        alt="illustration"
                    />
                </div>
            </div>

            {/* RIGHT LOGIN CARD */}
            <div className="portal-auth-right">

                {/* Top Center Logo */}
                <div className="auth-logo">
                    <img src="/assets/img/logo.svg" alt="Company Logo" />
                </div>

                {/* Centered Title Section */}
                <div className="auth-content">
                    <div className="auth-header">
                        <h2>Sign In</h2>
                        <p>Please enter your details to sign in</p>
                    </div>

                    <form onSubmit={handleLogin}>

                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit">Sign In</button>

                        <div className="divider">OR</div>

                        <button
                            type="button"
                            className="secondary-btn"
                            onClick={() =>
                                navigate("/job-portal/create-account", {
                                    state: { jobId: jobId, jobTitle: jobTitle },
                                })
                            }
                        >
                            Create New Account
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
