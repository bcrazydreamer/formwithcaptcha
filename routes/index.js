const express = require('express');
const router = express.Router();
const mdlw = require('../middleware').user;

router.get('/',mdlw.createUserAttamps,mdlw.loopAttack, function(req, res, next) {
  res.render('index', { title: 'Assignment',loop_at_tkn : req.loopAttackToken,enblCaptcha : req.enblCaptcha});
});

module.exports = router;
