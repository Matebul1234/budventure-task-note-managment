const express = require('express');
const ensureAuthenticated = require('../Middlewares/Auth');
const { notesValidation, add_notes } = require('../Middlewares/NotesValidation');
const { addNotes, updateNotes, deleteNotes, getAllNotes, getNoteById } = require('../Controllers/NotesController');
const { route } = require('./AuthRouter');
const router = express.Router();

// Add a note
router.post('/add-note', add_notes, addNotes);

// Update a note by ID
router.put('/update-note/:id', add_notes, updateNotes);

// Delete a note by Id
router.delete('/delete-note/:id', deleteNotes);
// all notes 
router.get('/all-notes', getAllNotes)
// notes by id 
router.get('/:id', getNoteById)


module.exports = router;
