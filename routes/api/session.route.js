const account=require('../../models/account/account.model');
const express=require('express');
const bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var router=express.Router();

router.post('/login',jsonParser,async (req, res)=>{
    //console.log(req.body);
    let acc_list=await account.all();
    //console.log(acc_list);
    console.log(req);
    for (let item of acc_list) {
        if(item.username===req.body.username && item.password===req.body.password){
            req.session.isLogin=true;
            req.session.ID=item.ID;
            return res.status(200).json({
                isLogin:true
            });
        }
    }
    return res.status(200).json({
        isLogin:false
    });
});
router.post('/logout',bodyParser.json, (req,res)=>{
    delete req.session.isLogin;
    delete req.session.ID;
    return res.status(200);
})
module.exports=router;