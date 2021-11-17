const mongoose = require('mongoose');

const sentenceSchema = new mongoose.Schema({
    title : String,
    sentence:String
},{timestamps : true})

const sentenceModel = mongoose.model('Sentence' , sentenceSchema);
module.exports = sentenceModel;