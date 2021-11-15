const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
    inputWord:String,
    selectedWord:[String],
},{timestamps:true})

let WordModel = mongoose.model('Words' , wordSchema);
module.exports = WordModel;