const router =require('express').Router();

router.use('/account',require('./account.route'));
router.use('/session',require('./session.route'));

module.exports=router;