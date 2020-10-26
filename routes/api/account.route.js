const account=require('../../models/account/account.model');
const express=require('express');
var bodyParser = require('body-parser')

// create application/json parser
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const router=express.Router();
router.post('/',async (req,res,next)=>{
    const accounts=await account.all();
    console.log(req.session);
    if(!accounts)
        return res.status(404).json({
            errors:{
                data: 'data not found'
            }
        });
    return res.json({
        account_list:accounts,
        isLogin:req.session.isLogin===true
    });
});
router.get('/',async (req,res,next)=>{
    const accounts=await account.all();
    if(!accounts)
        return res.status(404).json({
            errors:{
                data: 'data not found'
            }
        });
    return res.json({
        account_list:accounts
    });
});
router.post('/add',jsonParser,async (req,res)=>{
    const _account= await account.all();
    req.body.ID=_account.length<9?'0'+(_account.length+1):''+(_account.length+1);
    await account.add(req.body);

    const refresh_acc=await account.all();
    return res.status(200).json({
        account_list:refresh_acc
    });
});
router.post('/update',jsonParser,async(req,res)=>{
    await account.patch(req.body);
    const account_list=await account.all();
    console.log(account_list);
    return res.status(200).json({
        account_list:account_list
    });
});
router.post('/delete',async(req,res,next)=>{
    const id=req.query.id;
    if(!id)
        return res.status(404).json({
            parameter:{
                query:'require account ID'
            }
        });

    const _accounts=await account.single(id);
    if(!_accounts)
        return res.status(404).json({
            accountErr:{
                account:'account not found'
            }
        });
    else {
        account.delete(id);
        let acc_list = await account.all();
        return res.status(200).json({
            account_list: acc_list
        });
    }
})
module.exports=router;