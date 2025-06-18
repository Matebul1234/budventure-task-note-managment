import React, { useState } from 'react';
import '../assets/login.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const Signup = () => {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: ''
    });

    const [errors, setErrors] = useState({
        name: false,
        email: false,
        password: false,
        confirm_password: false
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo({ ...signupInfo, [name]: value });
        setErrors({ ...errors, [name]: false });
    };

    const formSubmit = async (e) => {
        e.preventDefault();

        const { name, email, password, confirm_password } = signupInfo;

        const newErrors = {
            name: !name,
            email: !email,
            password: !password,
            confirm_password: !confirm_password || password !== confirm_password
        };
        if(password !== confirm_password){
            return toast.error('Passwords do not match');
        }

        if (Object.values(newErrors).some(Boolean)) {
            setErrors(newErrors);
            toast.error("Please fill all fields correctly.");
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/auth/signup`, {
                name,
                email,
                password
            });

            const { success, message } = response.data;

            if (success) {
                toast.success(message || "Signup successful!");
                setTimeout(() => navigate('/login'), 1000);
            } else {
                toast.error(message || "Signup failed");
            }
        } catch (err) {
            console.error("Signup error:", err);
            const msg = err?.response?.data?.message || "Something went wrong";
            toast.error(msg);
            if (msg.includes("User already exists")) {
                setErrors({ ...errors, email: true });
            }
        }
    };

    return (
        <>
            <div className="login-form w-50">
                <form onSubmit={formSubmit}>
                    <div className="avatar"></div>
                    <h4 className="modal-title">Sign up</h4>

                    <div className="form-group">
                        <label>Name*</label>
                        <input
                            type="text"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            placeholder="Name.."
                            name='name'
                            value={signupInfo.name}
                            onChange={handleChange}
                        />
                        {errors.name && <div className="invalid-feedback">Name is required</div>}
                    </div>

                    <div className="form-group">
                        <label>Email*</label>
                        <input
                            type="text"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            placeholder="Email.."
                            name='email'
                            value={signupInfo.email}
                            onChange={handleChange}
                        />
                        {errors.email && <div className="invalid-feedback">Valid Email is required or already registered</div>}
                    </div>

                    <div className="form-group">
                        <label>Password*</label>
                        <input
                            type="password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            placeholder="Password.."
                            name='password'
                            value={signupInfo.password}
                            onChange={handleChange}
                        />
                        {errors.password && <div className="invalid-feedback">Password is required</div>}
                    </div>

                    <div className="form-group">
                        <label>Confirm Password*</label>
                        <input
                            type="password"
                            className={`form-control ${errors.confirm_password ? 'is-invalid' : ''}`}
                            placeholder="Confirm Password.."
                            name='confirm_password'
                            value={signupInfo.confirm_password}
                            onChange={handleChange}
                        />
                        {errors.confirm_password && <div className="invalid-feedback">Passwords must match</div>}
                    </div>

                    <input type="submit" className="btn btn-primary btn-block btn-lg w-100" value="Sign up" />
                </form>
                <div className="text-csmall">Already have an account? <Link to="/login">Login</Link></div>
            </div>

            <ToastContainer />
        </>
    );
};

export default Signup;
