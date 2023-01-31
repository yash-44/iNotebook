import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";


export const Navbar = () => {

    let history = useNavigate()
    const handleLogout = ()=>{
        localStorage.removeItem('authtoken')
        history('/login')
    }

    // show location of link
    let location = useLocation().pathname;
    useEffect(() => {
        //    console.log(location)
    }, [location]);

    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('authtoken')?<form className="d-flex" role="search">
                        <Link  to="/login" className="btn btn-outline-secondary mx-1">Login</Link>
                        <Link  to="/signup" className="btn btn-outline-success mx-1">SignUp</Link>
                    </form>: <button onClick={handleLogout} className='btn btn-primary'>Logout</button> }
                </div>
            </div>
        </nav>
    )
}




export default Navbar
