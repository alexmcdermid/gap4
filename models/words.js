const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wordSchema = new mongoose.Schema({
    inputWord:String,
    selectedWord:[String],
    user: { type: Schema.Types.ObjectId, ref: 'User' },
},{timestamps:true})

let WordModel = mongoose.model('Words' , wordSchema);
module.exports = WordModel;