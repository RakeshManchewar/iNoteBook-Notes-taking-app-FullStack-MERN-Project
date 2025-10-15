import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = ({ children }) => {
    const host = "http://localhost:5000";
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch all notes
    const getNotes = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                const json = await response.json();
                setNotes(json.notes || []);
            } else {
                console.error('Failed to fetch notes');
                setNotes([]);
            }
        } catch (error) {
            console.error('Error fetching notes:', error);
            setNotes([]);
        }
        setLoading(false);
    };

    // Add a new note
    const addNote = async (title, description, tag = 'general') => {
        try {
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description, tag })
            });

            if (response.ok) {
                const result = await response.json();
                setNotes(prevNotes => [result.note, ...prevNotes]);
                return { success: true };
            } else {
                return { success: false, error: 'Failed to add note' };
            }
        } catch (error) {
            console.error('Error adding note:', error);
            return { success: false, error: 'Connection error' };
        }
    };

    // Update a note
    const editNote = async (id, title, description, tag) => {
        try {
            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description, tag })
            });

            if (response.ok) {
                setNotes(prevNotes =>
                    prevNotes.map(note =>
                        note._id === id
                            ? { ...note, title, description, tag }
                            : note
                    )
                );
                return { success: true };
            } else {
                return { success: false, error: 'Failed to update note' };
            }
        } catch (error) {
            console.error('Error updating note:', error);
            return { success: false, error: 'Connection error' };
        }
    };

    // Delete a note
    const deleteNote = async (id) => {
        try {
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (response.ok) {
                setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
                return { success: true };
            } else {
                return { success: false, error: 'Failed to delete note' };
            }
        } catch (error) {
            console.error('Error deleting note:', error);
            return { success: false, error: 'Connection error' };
        }
    };

    const contextValue = {
        notes,
        loading,
        getNotes,
        addNote,
        editNote,
        deleteNote
    };

    return (
        <NoteContext.Provider value={contextValue}>
            {children}
        </NoteContext.Provider>
    );
};

export default NoteState;