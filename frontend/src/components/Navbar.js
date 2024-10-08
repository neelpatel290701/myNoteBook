import { React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {

    let location = useLocation();
    const navigate = useNavigate()

    const handleLogout = ()=>{
            localStorage.removeItem("auth-token")
            navigate("/login")
    }

    const count = useSelector(state => state.count)

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">myNoteBook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""} `} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""} `} to="/about">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem("auth-token") ? (
                        <>
                            <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                            <Link className="btn btn-primary mx-2" to="/signup" role="button">Sign Up</Link>
                        </>
                    ) :
                    <>
                    <button className="btn btn-primary mx-2" role="button">{count}</button>
                    <button className="btn btn-primary mx-2" onClick={handleLogout} role="button">Logout</button>
                    </>
                    }


                </div>
            </div>
        </nav>
    )
}
