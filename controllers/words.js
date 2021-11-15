const Word = require('../models/words.js');

module.exports = {
    create,
    show,
    deleteWords
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
        let showResult = await Word.find();
        res.status(200).json(showResult);
    }catch(err){
        res.status(400).json(err)
    }
}

async function deleteWords(req,res){
    try{
        let deletedItem = await Word.findByIdAndRemove(req.params.id);
        let items = await Word.find();
        res.status(200).json(items);
    }catch(err){
        res.status(400).json(err);
    }
}