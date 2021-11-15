const express = require('express');
const router = express.Router();
const wordCtrl = require('../../controllers/words.js');

router.get('/saved' , wordCtrl.show);
router.post('/add' , wordCtrl.create);
router.delete('/saved/delete/:id' , wordCtrl.deleteWords);


module.exports = router;