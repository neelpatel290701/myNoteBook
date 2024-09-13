const express = require('express')
const router = express.Router()

const Note = require('../models/Note')
const fetchUser = require('../middlewares/fetchuser')
const { body , validationResult } = require('express-validator');


//ROUTE - 1 Fetch All Notes
router.get('/fetchallnotes', fetchUser , async (req,res)=>{
        try{
            const notes = await Note.find({userid : req.user.id})
            res.json(notes)
        }catch(err){
            res.status(400).json({error : "something went wrong"})
        }
})


//ROUTE - ADD NOTE
router.post('/addnote', fetchUser , [
    body("title","minimum lenghth should be 3").isLength({min:3}),
    body("description","minimum lenghth should be 3").isLength({min:3}),
], async (req,res)=>{

    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors : errors.array()
            })
        }

        const {title , description , tag} = req.body ;

        console.log(req.user.id)
      
        const notes = new Note({
            title , description , tag , userid : req.user.id
        })

        const savenotes = await notes.save()
        res.json(savenotes)

    }catch(err){
        res.status(500).send("Internal Server error")
        console.log(err)
    }
})



//ROUTE - 3 UPDATE Note
router.put('/updatenote/:id' , fetchUser , async (req,res)=>{

        const newNote = {} ;
        const {title , description , tag} = req.body

        if(title) {newNote.title = title} ;
        if(description) {newNote.description = description} ;
        if(tag) {newNote.tag = tag};


        let note = await Note.findById(req.params.id) ;
        if(!note) return res.status(404).send("Note Not Found") ;

        if(note.userid.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id ,{$set : newNote},{new:true});
        res.json(note) ;

})


module.exports = router