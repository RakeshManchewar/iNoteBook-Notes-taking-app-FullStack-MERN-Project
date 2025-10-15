import React, { useContext, useState } from 'react';
import NoteContext from '../context/NoteContext';

const NoteItem = ({ note, updateNote, showAlert }) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            setIsDeleting(true);
            const result = await deleteNote(note._id);

            if (result.success) {
                showAlert('Note deleted successfully!', 'success');
            } else {
                showAlert(result.error || 'Failed to delete note', 'danger');
            }
            setIsDeleting(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0 note-card">
                <div className="card-body d-flex flex-column">
                    {/* Note Header */}
                    <div className="d-flex justify-content-between align-items-start mb-3">
                        <h5 className="card-title fw-bold text-primary mb-0 flex-grow-1 me-2">
                            {note.title}
                        </h5>
                        <div className="d-flex gap-1 flex-shrink-0">
                            <button
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => updateNote(note)}
                                title="Edit note"
                            >
                                <i className="fas fa-edit"></i>
                            </button>
                            <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={handleDelete}
                                disabled={isDeleting}
                                title="Delete note"
                            >
                                {isDeleting ? (
                                    <span className="spinner-border spinner-border-sm"></span>
                                ) : (
                                    <i className="fas fa-trash"></i>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Note Content */}
                    <p className="card-text text-muted flex-grow-1 mb-3">
                        {note.description.length > 150
                            ? `${note.description.substring(0, 150)}...`
                            : note.description
                        }
                    </p>

                    {/* Note Footer */}
                    <div className="mt-auto">
                        <div className="d-flex justify-content-between align-items-center">
                            {/* Tag */}
                            <div>
                                {note.tag && (
                                    <span className="badge bg-secondary">
                                        <i className="fas fa-tag me-1"></i>
                                        {note.tag}
                                    </span>
                                )}
                            </div>

                            {/* Date */}
                            <small className="text-muted">
                                <i className="far fa-clock me-1"></i>
                                {formatDate(note.date || note.createdAt)}
                            </small>
                        </div>
                    </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="card-hover-overlay"></div>
            </div>

            <style jsx>{`
        .note-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        
        .note-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.1) !important;
        }
        
        .card-hover-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(13, 110, 253, 0.05), rgba(25, 135, 84, 0.05));
          opacity: 0;
          transition: opacity 0.2s ease;
          pointer-events: none;
        }
        
        .note-card:hover .card-hover-overlay {
          opacity: 1;
        }
        
        .btn {
          transition: all 0.2s ease;
        }
        
        .btn:hover {
          transform: scale(1.05);
        }
      `}</style>
        </div>
    );
};

export default NoteItem;