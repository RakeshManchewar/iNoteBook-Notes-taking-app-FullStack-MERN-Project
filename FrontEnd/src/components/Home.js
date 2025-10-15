import React from 'react';
import AddNote from './AddNote';
import Notes from './Notes';

const Home = ({ showAlert }) => {
    return (
        <div className="container-fluid">
            <div className="row">
                {/* Add Note Section */}
                <div className="col-lg-4 mb-4">
                    <div className="sticky-top" style={{ top: '20px' }}>
                        <AddNote showAlert={showAlert} />
                    </div>
                </div>

                {/* Notes Display Section */}
                <div className="col-lg-8">
                    <Notes showAlert={showAlert} />
                </div>
            </div>
        </div>
    );
};

export default Home;