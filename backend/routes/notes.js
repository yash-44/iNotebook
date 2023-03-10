const express = require('express')
const router = express.Router()
const fetchuser = require('../Middleware/fetchuser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator')
// const { json } = require('express')



// Route-1 //- Get All the user notes using: GET "/api/notes/fetchallnotes" . after login
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal server error')
    }
})

// Route-2 //- Add a Note using : post "/api/notes/addnote" . login required
router.post('/addnote', fetchuser, [
    body('title', "Please enter a valid Title").isLength({ min: 3 }),
    body('description', "Description length must be atleast 5 characters").isLength({ min: 5 }),

], async (req, res) => {
    try {

        const { title, description, tag } = req.body
        // if there are errors so , return bad request and error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()

        res.json(savedNote)

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal server error')
    }
})

// Route-3 //- Upadate a Note using : put "/api/notes/updatenote" . login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body
    try {
        // Create a network object
        let newNote = {}
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        // Find the note to be update and update it
        let note = await Notes.findById(req.params.id)
        if (!note) { return res.status(404).send('Not Found') }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})


// Route-4 //- Delete a Note using : delete "/api/notes/deletenote" . login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await Notes.findById(req.params.id)
        if (!note) { return res.status(404).send('Not Found') }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router