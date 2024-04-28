const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
const multer  = require('multer')
const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, uniqueSuffix+file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
  


// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.get('/fetchallnoteswithoutid', async (req, res) => {
    try {
        const notes = await Note.find(); // Remove the user filter
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
], upload.single('file'), async (req, res) => {
    console.log(req.file)
    try {
        const { title, description, tag} = req.body;
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req.body);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Extract file information from req.file
        const { filename, path } = req.file;

        // Save this file information along with your note data
        const note = new Note({
            title,
            description,
            tag,
            user: req.user.id,
            uid: crypto.randomUUID(),
            file: {
                filename,
                path
            }
        });

        const savedNote = await note.save();

        res.json(savedNote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});



// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, upload.single('file'), async (req, res) => {
    const { title, description, tag } = req.body;
    console.log(req.body)
    try {
        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };
        if (req.file) {
            newNote.file = {
                filename: req.file.filename,
                path: req.file.path
            };
        }
        
        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 5: Like an existing Note using: PUT "/api/notes/like". Login required
router.put('/like/:id', fetchuser, async (req, res) => {
    try {
        const result = await Note.findByIdAndUpdate(req.params.id, {
            $push: { likes: req.user.id }
        }, {
            new: true
        })
        res.json(result)
    } catch (err) {
        return res.status(422).json({ error: err })
    }
})

// ROUTE 6: UnLike an existing Note using: PUT "/api/notes/unlike". Login required
router.put('/unlike/:id', fetchuser, async (req, res) => {
    try {
        const result = await Note.findByIdAndUpdate(req.params.id, {
            $pull: { likes: req.user.id }
        }, {
            new: true
        })
        res.json(result)
    } catch (err) {
        return res.status(422).json({ error: err })
    }
})

// ROUTE 7: Check if the user has liked a note using: GET "/api/notes/isliked/:id". Login required
router.get('/isliked/:id', fetchuser, async (req, res) => {
    try {
        const noteId = req.params.id;
        const userId = req.user.id;

        // Check if the user has liked the note
        const note = await Note.findById(noteId);
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }

        // Check if the user's ID exists in the likes array of the note
        const isLiked = note.likes.includes(userId);
        // console.log(note)
        res.json({ isLiked,note });
    } catch (err) {
        return res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router


