import React from 'react';

const About = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-sm border-0">
                        <div className="card-body p-5">
                            <div className="text-center mb-5">
                                <h1 className="display-4 fw-bold text-primary mb-3">About iNoteBook</h1>
                                <p className="lead text-muted">
                                    Your personal digital notebook for organizing thoughts, ideas, and memories
                                </p>
                            </div>

                            <div className="row g-4 mb-5">
                                <div className="col-md-4 text-center">
                                    <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                                        style={{ width: '80px', height: '80px' }}>
                                        <i className="fas fa-shield-alt fa-2x text-primary"></i>
                                    </div>
                                    <h5 className="fw-bold">Secure</h5>
                                    <p className="text-muted small">
                                        Your notes are protected with industry-standard security measures
                                    </p>
                                </div>

                                <div className="col-md-4 text-center">
                                    <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                                        style={{ width: '80px', height: '80px' }}>
                                        <i className="fas fa-sync-alt fa-2x text-success"></i>
                                    </div>
                                    <h5 className="fw-bold">Real-time Sync</h5>
                                    <p className="text-muted small">
                                        Access your notes from anywhere with automatic synchronization
                                    </p>
                                </div>

                                <div className="col-md-4 text-center">
                                    <div className="bg-info bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                                        style={{ width: '80px', height: '80px' }}>
                                        <i className="fas fa-tags fa-2x text-info"></i>
                                    </div>
                                    <h5 className="fw-bold">Organized</h5>
                                    <p className="text-muted small">
                                        Keep your notes organized with tags and easy search functionality
                                    </p>
                                </div>
                            </div>

                            <div className="bg-light rounded p-4 mb-4">
                                <h4 className="fw-bold mb-3">Key Features</h4>
                                <div className="row">
                                    <div className="col-md-6">
                                        <ul className="list-unstyled">
                                            <li className="mb-2">
                                                <i className="fas fa-check text-success me-2"></i>
                                                Create and edit notes instantly
                                            </li>
                                            <li className="mb-2">
                                                <i className="fas fa-check text-success me-2"></i>
                                                Organize with custom tags
                                            </li>
                                            <li className="mb-2">
                                                <i className="fas fa-check text-success me-2"></i>
                                                Secure user authentication
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-md-6">
                                        <ul className="list-unstyled">
                                            <li className="mb-2">
                                                <i className="fas fa-check text-success me-2"></i>
                                                Responsive design
                                            </li>
                                            <li className="mb-2">
                                                <i className="fas fa-check text-success me-2"></i>
                                                Fast and intuitive interface
                                            </li>
                                            <li className="mb-2">
                                                <i className="fas fa-check text-success me-2"></i>
                                                Cloud-based storage
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center">
                                <h5 className="fw-bold mb-3">Built with Modern Technologies</h5>
                                <div className="d-flex justify-content-center flex-wrap gap-3">
                                    <span className="badge bg-primary fs-6 py-2 px-3">React</span>
                                    <span className="badge bg-success fs-6 py-2 px-3">Node.js</span>
                                    <span className="badge bg-info fs-6 py-2 px-3">MongoDB</span>
                                    <span className="badge bg-warning fs-6 py-2 px-3">Bootstrap</span>
                                    <span className="badge bg-danger fs-6 py-2 px-3">Express</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;