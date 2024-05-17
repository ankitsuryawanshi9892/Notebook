import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import '../css/navbar.css';  

const Navbar = () => {
    let location = useLocation();
    let navigate = useNavigate();
    const handleLogout=()=>{
      localStorage.removeItem('token');
      navigate('/login');
    }
    return (
        <>
            <nav className="nav-main">
            <div className="logo">
                <h2>iNotebook</h2>
            </div>
            <div className="menu-items">
                <ul className="nav-items-desktop">
                    <li><Link to="/">Home</Link></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="">Your Tasks</a></li>
                    <li><a href="">Ask Questions</a></li>
                </ul>
            </div>
            <div className="nav-right">
                <button className="search-button button"></button>
                <form id="search-form">
                    <input type="text" placeholder="Search Note..." id="search-input"/>
                    <i className="fa-solid fa-magnifying-glass icon"></i>
                </form>
                <button className="logout-button button">Log Out</button>
                <div className="humberger-icon">
                    <i className="fa-solid fa-bars"></i>
                </div>
            </div>
        </nav>
        <ul className="nav-items-mobile">
            <li></li>
        </ul>
        </>
    )
}

export default Navbar
