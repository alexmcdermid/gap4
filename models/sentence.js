const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sentenceSchema = new mongoose.Schema({
    title : String,
    sentence:String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
},{timestamps : true})

const sentenceModel = mongoose.model('Sentence' , sentenceSchema);
module.exports = sentenceModel;