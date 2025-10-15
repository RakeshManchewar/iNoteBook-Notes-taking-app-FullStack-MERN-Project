import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
            <div className="container">
                {/* Brand */}
                <Link className="navbar-brand fw-bold fs-3" to="/">
                    <i className="fas fa-book-open me-2"></i>
                    iNoteBook
                </Link>

                {/* Mobile Toggle Button */}
                <button
                    className="navbar-toggler border-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navigation Items */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link
                                className={`nav-link px-3 py-2 rounded mx-1 ${isActive('/') ? 'bg-white bg-opacity-20 fw-bold' : ''
                                    }`}
                                to="/"
                            >
                                <i className="fas fa-home me-1"></i>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link px-3 py-2 rounded mx-1 ${isActive('/about') ? 'bg-white bg-opacity-20 fw-bold' : ''
                                    }`}
                                to="/about"
                            >
                                <i className="fas fa-info-circle me-1"></i>
                                About
                            </Link>
                        </li>
                    </ul>

                    {/* Authentication Buttons */}
                    <div className="d-flex align-items-center">
                        {isLoggedIn ? (
                            <div className="d-flex align-items-center">
                                <span className="text-white me-3 d-none d-md-block">
                                    <i className="fas fa-user-circle me-1"></i>
                                    Welcome back!
                                </span>
                                <button
                                    className="btn btn-outline-light btn-sm px-3"
                                    onClick={handleLogout}
                                >
                                    <i className="fas fa-sign-out-alt me-1"></i>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="d-flex gap-2">
                                <Link
                                    className={`btn btn-sm px-3 ${isActive('/login')
                                            ? 'btn-light text-primary'
                                            : 'btn-outline-light'
                                        }`}
                                    to="/login"
                                >
                                    <i className="fas fa-sign-in-alt me-1"></i>
                                    Login
                                </Link>
                                <Link
                                    className={`btn btn-sm px-3 ${isActive('/signup')
                                            ? 'btn-light text-primary'
                                            : 'btn-outline-light'
                                        }`}
                                    to="/signup"
                                >
                                    <i className="fas fa-user-plus me-1"></i>
                                    Signup
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;