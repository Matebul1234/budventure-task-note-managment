import React, { useState } from 'react'
import '../assets/login.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        email: false,
        password: false
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo({ ...loginInfo, [name]: value });
        setErrors({ ...errors, [name]: false }); // Reset error on input change
    };

    const formSubmit = async (e) => {
        debugger
        e.preventDefault();

        const { email, password } = loginInfo;
        const newErrors = {
            email: !email,
            password: !password
        };

        if (newErrors.email || newErrors.password) {
            setErrors(newErrors);
            toast.error("Email and Password are required!");
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                email,
                password
            });

            const { success, message, jwtToken, name, error } = response.data;

            if (success) {
                toast.success("Login successful!");
                localStorage.setItem('token', jwtToken);
                
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => navigate('/notes'), 1000);
            } else if (error) {
                toast.error(error?.details?.[0]?.message || "Login failed");
            } else {
                toast.error(message || "Login failed");
            }
        } catch (err) {
            const errMsg = err?.response?.data?.message;

            if (errMsg === "Email is not registered") {
                setErrors({ ...errors, email: true });
                toast.error(errMsg);
            } else if (errMsg === "Incorrect password") {
                setErrors({ ...errors, password: true });
                toast.error(errMsg);
            }else if(errMsg === `"email" must be a valid email`){
                toast.error("Email is not valid");
            } else {
                toast.error("Something went wrong");
            }
        }
    };

    return (
        <>
            <div className="login-form">
                <form onSubmit={formSubmit}>
                    <div className="avatar"></div>
                    <h4 className="modal-title">Login</h4>

                    <div className="form-group">
                        <label htmlFor="email">Email*</label>
                        <input
                            type="text"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            placeholder="Email"
                            name="email"
                            value={loginInfo.email}
                            onChange={handleChange}
                        />
                        {errors.email && <div className="invalid-feedback">Email is required or incorrect</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password*</label>
                        <input
                            type="password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            placeholder="Password"
                            name="password"
                            value={loginInfo.password}
                            onChange={handleChange}
                        />
                        {errors.password && <div className="invalid-feedback">Password is required or incorrect</div>}
                    </div>

                    <input type="submit" className="btn btn-primary btn-block btn-lg w-100" value="Login" />
                </form>
                <div className="text-center small">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </div>
            </div>

            <ToastContainer />
        </>
    );
};

export default Login;
