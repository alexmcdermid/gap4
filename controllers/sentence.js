const Sentence = require('../models/sentence.js');

module.exports = {
    create,
    show,
    update,
    deleteItem
}

async function create(req,res){
    try{
        let result = await Sentence.create({
            title:req.body.title,
            sentence:req.body.sentence
        })
        console.log("sentence-DB:" , result);
        res.status(200).json("added to the DB");
    }catch(err){
        res.status(400).json(err);
    }
}

async function show(req,res){
    try{
        let showItems = await Sentence.find();
        res.status(200).json(showItems)
    }catch(err){
        res.status(400).json(err);
    }
}

async function update(req,res){
    try{
        let item = await Sentence.findById(req.params.id);
        if(!item){
            res.status(400).send("data not found");
        }else{
            item.title=req.body.title,
            item.sentence=req.body.sentence
        }
        item.save();
        res.status(200).json(item)
    }catch(err){
        res.status(400).jason(err);
    }
}

async function deleteItem(req,res){
    try{
        let deleteItem = await Sentence.findByIdAndRemove(req.params.id);
        let items = await Sentence.find();
        res.status(200).json(items);
    }catch(err){
        res.status(400).json(err)
    }
}