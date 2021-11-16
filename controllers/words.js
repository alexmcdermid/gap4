const Word = require('../models/words.js');

module.exports = {
    create,
    show,
    deleteWords,
    deleteWord
}

async function create(req, res){
    try{
        console.log(req.body)
        let result = await Word.create({
            inputWord : req.body.search,
            selectedWord : req.body.words
        })
        console.log("database:" , result);
        res.status(200).json("added to the database")
    }catch(err){
        console.log('made it to create but erroring')
        res.status(400).json(err);
    }
}

async function show(req,res){
    try{
        // let showResult = await Word.find();
        // res.status(200).json(showResult);
        Word.find({}).sort('-createdAt').exec((err,showResult)=>{
            res.status(200).json(showResult)
        })
    }catch(err){
        res.status(400).json(err)
    }
}

async function deleteWords(req,res){
    console.log('wojvnwvnw',req.params.id)
    try{
        let deletedItem = await Word.findByIdAndRemove(req.params.id);
        // let items = await Word.find();
        // res.status(200).json(items);
        Word.find({}).sort('-createdAt').exec((err,showResult)=>{
            res.status(200).json(showResult)
        })
    }catch(err){
        res.status(400).json(err);
    }
}

async function deleteWord(req,res){
    console.log('wojvnwvnw',req.params.id)
    try{
        let item = await Word.findById(req.params.id);
        console.log(item)
        
        Word.find({}).sort('-createdAt').exec((err,showResult)=>{
            res.status(200).json(showResult)
        })
    }catch(err){
        res.status(400).json(err);
    }
}