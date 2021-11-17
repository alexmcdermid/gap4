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
            selectedWord : req.body.words,
            user: req.user._id
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
        Word.find({user: req.user._id}).sort('-createdAt').exec((err,showResult)=>{
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
    try{
        //find the data piece
        let item = await Word.findById(req.params.id);
        console.log('data',item)
        //get the array from data and splice the index - save to temp arr
        let tempArr = item.selectedWord
        console.log('temp arr:',tempArr)
        tempArr.splice(req.params.index,1)
        console.log('temp arr after splice', tempArr)
        //find the data piece by id and replace with temp arr
        await Word.findByIdAndUpdate({_id:req.params.id},{selectedWord:tempArr})
        // then we find all and send back
        Word.find({}).sort('-createdAt').exec((err,showResult)=>{
            res.status(200).json(showResult)
        })
    }catch(err){
        res.status(400).json(err);
    }
}