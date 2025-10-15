import express from 'express';
const router = express.Router();

import Note from '../models/noteModel.js';
import { body, validationResult } from 'express-validator';

export const addNoteValidation = [
    body('title')
        .trim()
        .isLength({ min: 3 })
        .withMessage('Title must be at least 3 characters long'),

    body('description')
        .trim()
        .isLength({ min: 5 })
        .withMessage('Description must be at least 5 characters long')
];

// addnote
const checkValidationErrors = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }
    return null;
};

// updatenote & deletenote
const checkNoteOwnership = async (noteId, userId) => {
    try {
        const note = await Note.findById(noteId);

        if (!note) {
            return { error: "Note not found", status: 404 };
        }

        if (note.user.toString() !== userId) {
            return { error: "Access denied", status: 401 };
        }

        return { note };
    } catch (error) {
        return { error: "Invalid note ID", status: 400 };
    }
};

export const fetchAllNotes = async (req, res) => {
    try {
        // Find all notes belonging to the user
        const notes = await Note.find({ user: req.user.id })
            .sort({ createdAt: -1 }); // Sort by newest first

        res.json({
            success: true,
            notes,
            count: notes.length
        });

    } catch (error) {
        console.error('Fetch notes error:', error.message);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
}

export const addNote = async (req, res) => {
    try {
        // Check for validation errors
        const validationError = checkValidationErrors(req, res);
        if (validationError) return;

        const { title, description, tag } = req.body;

        // Create new note
        const newNote = new Note({
            title: title.trim(),
            description: description.trim(),
            tag: tag ? tag.trim() : 'General',
            user: req.user.id
        });

        // Save note to database
        const savedNote = await newNote.save();

        res.status(201).json({
            success: true,
            note: savedNote,
            message: "Note added successfully"
        });

    } catch (error) {
        console.error('Add note error:', error.message);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
}

export const updateNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        const { title, description, tag } = req.body;

        // Check if note exists and belongs to user
        const ownershipCheck = await checkNoteOwnership(noteId, req.user.id);
        if (ownershipCheck.error) {
            return res.status(ownershipCheck.status).json({
                success: false,
                error: ownershipCheck.error
            });
        }

        // Build update object (only include fields that are provided)
        const updateData = {};
        if (title) updateData.title = title.trim();
        if (description) updateData.description = description.trim();
        if (tag !== undefined) updateData.tag = tag.trim();

        // Check if at least one field is provided
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                success: false,
                error: "Please provide at least one field to update"
            });
        }

        // Update the note
        const updatedNote = await Note.findByIdAndUpdate(
            noteId,
            { $set: updateData },
            { new: true } // Return updated document
        );

        res.json({
            success: true,
            note: updatedNote,
            message: "Note updated successfully"
        });

    } catch (error) {
        console.error('Update note error:', error.message);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
}

export const deleteNote = async (req, res) => {
    try {
        const noteId = req.params.id;

        // Check if note exists and belongs to user
        const ownershipCheck = await checkNoteOwnership(noteId, req.user.id);
        if (ownershipCheck.error) {
            return res.status(ownershipCheck.status).json({
                success: false,
                error: ownershipCheck.error
            });
        }

        // Delete the note
        const deletedNote = await Note.findByIdAndDelete(noteId);

        res.json({
            success: true,
            message: "Note has been deleted",
            deletedNote: {
                id: deletedNote._id,
                title: deletedNote.title
            }
        });

    } catch (error) {
        console.error('Delete note error:', error.message);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
}

export const getNote = async (req, res) => {
    try {
        const noteId = req.params.id;

        // Find note by ID and check ownership
        const note = await Note.findOne({
            _id: noteId,
            user: req.user.id
        });

        if (!note) {
            return res.status(404).json({
                success: false,
                error: "Note not found"
            });
        }

        res.json({
            success: true,
            note
        });

    } catch (error) {
        console.error('Get note error:', error.message);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
}

export const search = async (req, res) => {
    try {
        const searchTerm = req.query.q;

        if (!searchTerm) {
            return res.status(400).json({
                success: false,
                error: "Please provide a search term"
            });
        }

        // Search in title and description
        const notes = await Note.find({
            user: req.user.id,
            $or: [
                { title: { $regex: searchTerm, $options: 'i' } },
                { description: { $regex: searchTerm, $options: 'i' } }
            ]
        }).sort({ createdAt: -1 });

        res.json({
            success: true,
            notes,
            count: notes.length,
            searchTerm
        });

    } catch (error) {
        console.error('Search notes error:', error.message);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
}

export default router;