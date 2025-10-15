import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ showAlert }) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });

            const json = await response.json();

            if (json.success !== false && json.authToken) {
                localStorage.setItem('token', json.authToken);
                showAlert('Welcome back! Login successful', 'success');
                navigate('/');
            } else {
                showAlert(json.error || 'Invalid credentials', 'danger');
            }
        } catch (error) {
            showAlert('Connection error. Please try again.', 'danger');
        }

        setLoading(false);
    };

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
                <div className="card shadow-sm border-0">
                    <div className="card-body p-5">
                        <div className="text-center mb-4">
                            <h3 className="fw-bold text-primary mb-2">Welcome Back</h3>
                            <p className="text-muted">Sign in to your iNoteBook account</p>
                        </div>

                        <form onSubmit={handleSubmit}>
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

                            <div className="mb-4">
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
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary btn-lg w-100 mb-3"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" />
                                        Signing in...
                                    </>
                                ) : (
                                    'Sign In'
                                )}
                            </button>

                            <div className="text-center">
                                <p className="mb-0 text-muted">
                                    Don't have an account?{' '}
                                    <Link to="/signup" className="text-primary text-decoration-none fw-medium">
                                        Create one here
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

export default Login;