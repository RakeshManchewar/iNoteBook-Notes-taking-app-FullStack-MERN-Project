import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = ({ showAlert }) => {
    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (credentials.password !== credentials.cpassword) {
            showAlert('Passwords do not match', 'danger');
            return;
        }

        if (credentials.password.length < 5) {
            showAlert('Password must be at least 5 characters long', 'danger');
            return;
        }

        setLoading(true);

        try {
            const { name, email, password } = credentials;
            const response = await fetch('http://localhost:5000/api/auth/createuser', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const json = await response.json();

            if (json.success !== false && json.authToken) {
                localStorage.setItem('token', json.authToken);
                showAlert('Account created successfully! Welcome to iNoteBook', 'success');
                navigate('/');
            } else {
                showAlert(json.error || 'Failed to create account', 'danger');
            }
        } catch (error) {
            showAlert('Connection error. Please try again.', 'danger');
        }

        setLoading(false);
    };

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const isFormValid = () => {
        return (
            credentials.name.length >= 2 &&
            credentials.email.length > 0 &&
            credentials.password.length >= 5 &&
            credentials.password === credentials.cpassword
        );
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-7 col-lg-6">
                <div className="card shadow-sm border-0">
                    <div className="card-body p-5">
                        <div className="text-center mb-4">
                            <h3 className="fw-bold text-primary mb-2">Join iNoteBook</h3>
                            <p className="text-muted">Create your account to get started</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label fw-medium">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    id="name"
                                    name="name"
                                    value={credentials.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    minLength={2}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label fw-medium">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    className="form-control form-control-lg"
                                    id="email"
                                    name="email"
                                    value={credentials.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label fw-medium">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    id="password"
                                    name="password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    placeholder="Create a password (min 5 characters)"
                                    minLength={5}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="cpassword" className="form-label fw-medium">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    id="cpassword"
                                    name="cpassword"
                                    value={credentials.cpassword}
                                    onChange={handleChange}
                                    placeholder="Confirm your password"
                                    minLength={5}
                                    required
                                />
                                {credentials.cpassword && credentials.password !== credentials.cpassword && (
                                    <div className="text-danger small mt-1">Passwords do not match</div>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary btn-lg w-100 mb-3"
                                disabled={loading || !isFormValid()}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" />
                                        Creating account...
                                    </>
                                ) : (
                                    'Create Account'
                                )}
                            </button>

                            <div className="text-center">
                                <p className="mb-0 text-muted">
                                    Already have an account?{' '}
                                    <Link to="/login" className="text-primary text-decoration-none fw-medium">
                                        Sign in here
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;