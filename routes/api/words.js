const express = require('express');
const router = express.Router();
const wordCtrl = require('../../controllers/words.js');

router.get('/saved' , wordCtrl.show);
router.post('/add' , wordCtrl.create);
router.get('/saved/delete/:id' , wordCtrl.deleteWords);
router.get('/saved/delete/:id/:index' , wordCtrl.deleteWord);


module.exports = router;