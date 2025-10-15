import React, { useState, useContext } from 'react';
import NoteContext from '../context/NoteContext';

const AddNote = ({ showAlert }) => {
    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setNote] = useState({
        title: '',
        description: '',
        tag: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const result = await addNote(
            note.title.trim(),
            note.description.trim(),
            note.tag.trim() || 'general'
        );

        if (result.success) {
            setNote({ title: '', description: '', tag: '' });
            showAlert('Note added successfully!', 'success');
        } else {
            showAlert(result.error || 'Failed to add note', 'danger');
        }

        setIsSubmitting(false);
    };

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const isFormValid = () => {
        return note.title.trim().length >= 5 && note.description.trim().length >= 5;
    };

    return (
        <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-primary text-white">
                <h4 className="card-title mb-0">
                    <i className="fas fa-plus-circle me-2"></i>
                    Add New Note
                </h4>
            </div>

            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    {/* Title Input */}
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label fw-medium">
                            Title <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            id="title"
                            name="title"
                            value={note.title}
                            onChange={handleChange}
                            placeholder="Enter note title (min 5 characters)"
                            minLength={5}
                            required
                        />
                        {note.title.length > 0 && note.title.length < 5 && (
                            <div className="text-danger small mt-1">
                                Title must be at least 5 characters long
                            </div>
                        )}
                    </div>

                    {/* Description Input */}
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label fw-medium">
                            Description <span className="text-danger">*</span>
                        </label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            value={note.description}
                            onChange={handleChange}
                            placeholder="Enter note description (min 5 characters)"
                            rows="5"
                            minLength={5}
                            required
                        ></textarea>
                        {note.description.length > 0 && note.description.length < 5 && (
                            <div className="text-danger small mt-1">
                                Description must be at least 5 characters long
                            </div>
                        )}
                    </div>

                    {/* Tag Input */}
                    <div className="mb-4">
                        <label htmlFor="tag" className="form-label fw-medium">
                            Tag <span className="text-muted">(Optional)</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="tag"
                            name="tag"
                            value={note.tag}
                            onChange={handleChange}
                            placeholder="Enter tag (e.g., work, personal, ideas)"
                        />
                        <div className="form-text">
                            Tags help you organize and find your notes easily
                        </div>
                    </div>

                    {/* Character Counters */}
                    <div className="row mb-3">
                        <div className="col-6">
                            <small className={`text-${note.title.length >= 5 ? 'success' : 'muted'}`}>
                                Title: {note.title.length} characters
                            </small>
                        </div>
                        <div className="col-6">
                            <small className={`text-${note.description.length >= 5 ? 'success' : 'muted'}`}>
                                Description: {note.description.length} characters
                            </small>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn btn-primary btn-lg w-100"
                        disabled={!isFormValid() || isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2"></span>
                                Adding Note...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-plus me-2"></i>
                                Add Note
                            </>
                        )}
                    </button>

                    {/* Form Validation Info */}
                    {(!isFormValid() && (note.title.length > 0 || note.description.length > 0)) && (
                        <div className="alert alert-info mt-3 mb-0">
                            <i className="fas fa-info-circle me-2"></i>
                            Both title and description must be at least 5 characters long
                        </div>
                    )}
                </form>
            </div>

            {/* Quick Tips */}
            <div className="card-footer bg-light">
                <div className="small text-muted">
                    <i className="fas fa-lightbulb me-1"></i>
                    <strong>Quick Tips:</strong> Use descriptive titles and meaningful tags to easily find your notes later.
                </div>
            </div>
        </div>
    );
};

export default AddNote;