import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/NoteContext';
import NoteItem from './NoteItem';

const Notes = ({ showAlert }) => {
    const context = useContext(NoteContext);
    const navigate = useNavigate();
    const { notes, getNotes, editNote, loading } = context;

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({
        id: '',
        etitle: '',
        edescription: '',
        etag: ''
    });

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        } else {
            navigate('/login');
        }
        // eslint-disable-next-line
    }, []);

    const updateNote = (currentNote) => {
        const modal = new window.bootstrap.Modal(ref.current);
        modal.show();
        setNote({
            id: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag || ''
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const result = await editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();

        if (result.success) {
            showAlert('Note updated successfully!', 'success');
        } else {
            showAlert(result.error || 'Failed to update note', 'danger');
        }
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const isFormValid = note.etitle.length >= 5 && note.edescription.length >= 5;

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-muted">Loading your notes...</p>
            </div>
        );
    }

    return (
        <>
            {/* Edit Note Modal */}
            <div
                className="modal fade"
                id="editNoteModal"
                tabIndex="-1"
                aria-labelledby="editNoteModalLabel"
                aria-hidden="true"
                ref={ref}
            >
                <div className="modal-dialog">
                    <div className="modal-content border-0 shadow">
                        <div className="modal-header bg-primary text-white">
                            <h5 className="modal-title" id="editNoteModalLabel">
                                <i className="fas fa-edit me-2"></i>
                                Edit Note
                            </h5>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>

                        <form onSubmit={handleUpdate}>
                            <div className="modal-body p-4">
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label fw-medium">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        id="etitle"
                                        name="etitle"
                                        value={note.etitle}
                                        onChange={onChange}
                                        placeholder="Enter note title"
                                        minLength={5}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label fw-medium">
                                        Description
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="edescription"
                                        name="edescription"
                                        value={note.edescription}
                                        onChange={onChange}
                                        placeholder="Enter note description"
                                        rows="4"
                                        minLength={5}
                                        required
                                    ></textarea>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label fw-medium">
                                        Tag
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="etag"
                                        name="etag"
                                        value={note.etag}
                                        onChange={onChange}
                                        placeholder="Enter tag (optional)"
                                    />
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button
                                    ref={refClose}
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={!isFormValid}
                                >
                                    <i className="fas fa-save me-1"></i>
                                    Update Note
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Notes Display */}
            <div className="notes-container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold text-primary mb-0">
                        <i className="fas fa-sticky-note me-2"></i>
                        Your Notes
                    </h2>
                    <span className="badge bg-primary fs-6 py-2 px-3">
                        {notes.length} {notes.length === 1 ? 'Note' : 'Notes'}
                    </span>
                </div>

                {notes.length === 0 ? (
                    <div className="text-center py-5">
                        <div className="mb-4">
                            <i className="fas fa-sticky-note fa-4x text-muted opacity-50"></i>
                        </div>
                        <h4 className="text-muted mb-3">No notes yet</h4>
                        <p className="text-muted">
                            Create your first note using the form on the left to get started!
                        </p>
                    </div>
                ) : (
                    <div className="row g-3">
                        {notes.map((note) => (
                            <NoteItem
                                key={note._id}
                                updateNote={updateNote}
                                note={note}
                                showAlert={showAlert}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Notes;