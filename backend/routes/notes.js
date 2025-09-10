const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const router = express.Router();
const { body, validationResult } = require('express-validator');

//route 1:fetchallnotes using GET
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("internal server error")
    }
});

//route 2:addnote using POST
router.post('/addnote', fetchuser, [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({ min: 5 }),
],
    async (req, res) => {
        try {
            const { title, description, tag,color } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title, description, tag,color, user: req.user.id
            })
            const savedNote = await note.save();
            res.json(savedNote);
        } catch (error) {
            console.error(error.message);
            res.status(500).json("internal server error")
        }
    });
    //route 3:updatenote using put
    router.put('/updatenote/:id',fetchuser,async(req,res)=>{
        const {title,description,tag,color}=req.body;
        try {
            const newNote={};
        if(title){newNote.title=title};
        if(description){newNote.description=description};
        if(tag){newNote.tag=tag};
        if(color){newNote.color=color};

        let note=await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")};

        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed");
        }
        note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
        res.json(note);
        }catch (error) {
            console.error(error.message);
            res.status(500).json("internal server error")
        }
    });
    //route 4:delete a note using DELETE
    router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
      try {
          let note=await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")};

        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note=await Note.findByIdAndDelete(req.params.id);
        res.json({"success":"note has been deleted successfully",note:note});
      }catch (error) {
            console.error(error.message);
            res.status(500).json("internal server error");
        }
    });

    // ROUTE 5 : Toggle pin/unpin a note  - PUT "/api/notes/togglepin/:id"
router.put('/togglepin/:id', fetchuser, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // toggle pin status
    note.pin = !note.pin;
    await note.save();
    res.json(note);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;