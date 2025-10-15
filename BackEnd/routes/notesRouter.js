import express from 'express';
const router = express.Router();
import { fetchAllNotes, addNote, updateNote, deleteNote, getNote, search, addNoteValidation } from '../controller/notesController.js';
import userAuth from '../middleware/userAuth.js';

// ROUTE 1: Get all user's notes
// GET /api/notes/fetchallnotes (login required)
router.get('/fetchallnotes', userAuth, fetchAllNotes);

// ROUTE 2: Add a new note
// POST /api/notes/addnote (login required)
router.post('/addnote', userAuth, addNoteValidation, addNote);

// ROUTE 3: Update an existing note
// PUT /api/notes/updatenote/:id (login required)
router.put('/updatenote/:id', userAuth, updateNote);

// ROUTE 4: Delete a note
// DELETE /api/notes/deletenote/:id (login required)
router.delete('/deletenote/:id', userAuth, deleteNote);

// ROUTE 5: Get a single note by ID
// GET /api/notes/getnote/:id (login required)
router.get('/getnote/:id', userAuth, getNote);

// ROUTE 6: Search notes
// GET /api/notes/search?q=searchterm (login required)
router.get('/search', userAuth, search);

export default router;