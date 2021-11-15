const express = require('express');
const router = express.Router();
const sentenceCtrl = require('../../controllers/sentence.js');

router.get('/' , sentenceCtrl.show);
router.post('/add' , sentenceCtrl.create);
router.post('/update/:id',sentenceCtrl.update);
router.delete('/delete/:id' , sentenceCtrl.deleteItem);

module.exports = router;