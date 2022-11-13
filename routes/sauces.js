const express = require('express');
const router = express.Router();
const souceCtrl = require('../controllers/sauces')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');



router.post('/sauces', auth ,  multer, souceCtrl.insertSauces)
router.get('/sauces'  , auth,  souceCtrl.findAllSouces)
router.get('/sauces/:id' , auth , souceCtrl.findOneSauces)
router.put('/sauces/:id' , auth , multer , souceCtrl.changeSauces)
router.delete('/sauces/:id' , auth , souceCtrl.deleteSauce)
router.post('/sauces/:id/like' , auth , souceCtrl.likeSauces)

module.exports = router;