import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./assets/navbar.css"
import { toast, ToastContainer } from 'react-toastify';

const Navbar = () => {
 const [loginuser, setLoignUser] = useState();
 const [token, setToken] = useState();
 const navigate = useNavigate();

 useEffect(() => {
  setLoignUser(localStorage.getItem('loggedInUser'));
  setToken(localStorage.getItem('token'));
 })

 const logoutuser = () => {
  if(!token){
   return toast.warn('you are already logout');
  }
  localStorage.removeItem('loggedInUser');
  localStorage.removeItem('token');
  toast.warn('user logout successfully');
  setTimeout(() => {
   navigate('/login');
  }, 1000)
 }
 return (
  <>
   <nav className="navbar navbar-expand-lg  px-4">

    <Link className="navbar-brand " href="#"> <img src="/bud-logo.png" alt="logo" style={{ width: "150px" }} /> </Link>

    <button
     className="navbar-toggler"
     type="button"
     data-bs-toggle="collapse"
     data-bs-target="#navbarContent"
     aria-controls="navbarContent"
     aria-expanded="false"
     aria-label="Toggle navigation"
    >
     <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
     <ul className="navbar-nav align-items-center">
      <li className="nav-item me-3">
       <Link className="nav-link fw-bold fs-5" href="#">
        Hi.. {loginuser || 'Matty'}
       </Link>
      </li>
      <li className="nav-item">
       <button className="btn btn-sm backgroundColor" onClick={logoutuser}>Logout</button>
      </li>
     </ul>
    </div>
   </nav>
   <div className="toastdiv">
    <ToastContainer />
   </div>
  </>
 );
};

export default Navbar;
