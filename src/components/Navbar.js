import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import '../css/navbar.css';  
import {useState} from 'react';
import AddNote from './AddNote';


const Navbar = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    const handleLogout=()=>{
      localStorage.removeItem('token');
      navigate('/login');
    }

    
    const [showAddNote, setShowAddNote] = useState(false); // State to track whether to show AddNote component
    const [shownav, setShownav] = useState(false)
    const toggleAddNote = () => {
        setShowAddNote(!showAddNote);
    };
    window.onscroll = function() {setShownav(!shownav);};

    // function scrollFunction() {
    //     if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
    //         setShownav(false);
    //     }
    //     else{
    //     setShownav(true);
    //     }
    // }

    return (
        <>
            {showAddNote && <AddNote showAlert={props.showAlert} toggleAddNote={toggleAddNote} show={showAddNote} />}
            <nav className="nav-main">
            <div className="logo">
                <h2>iNotebook</h2>
            </div>
            <div className="menu-items">
                <ul className="nav-items-desktop">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><a href="">Your Tasks</a></li>
                    <li><a href="">Ask Questions</a></li>
                </ul>
            </div>
            <div className="nav-right">
            {/* onClick={toggleAddNote} {showAddNote? 'Close Form':'Add A Note'} */}
                <button onClick={toggleAddNote} className="button add-button">{showAddNote? 'Close Form':'Add A Note'}</button>
                {!localStorage.getItem('token')?<form className="sign-up-login"> 
                <Link className="btn btn-primary button" to="/login" role="button">Login</Link>
                <Link className="btn btn-primary button" to="/signup" role="button">Signup</Link>
                </form>:(
                    <>
                        {/* onClick={handleLogout} */}
                    <button className="btn btn-primary button">
                        Logout
                    </button>
                    </>
                )}
                <div className="humberger-icon">
                    <i className="fa-solid fa-bars" onClick={()=>{setShownav(!shownav)}}></i>
                </div>
            </div>
        </nav>
        <ul id='nav-items' className={`nav-items-mobile ${shownav?'show-nav-items':''}`}>
            <li><a href="">Home</a></li>
            <li><a href="">About</a></li>
            <li><a href="">Your Tasks</a></li>
            <li><a href="">Ask Questions</a></li>
        </ul>
        </>
    )
}

export default Navbar
