const express = require('express');
const router = express.Router();
const userCtrl = require('../controller/user.controller');
const mdlw = require('../middleware').user;


router.post('/ping', (req,res,next)=>res.send("pong"));

router.post('/cr',mdlw.verifyLookAttackToken,mdlw.verifyCaptcha,userCtrl.createUser);


module.exports = router;