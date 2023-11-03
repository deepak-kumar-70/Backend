const express=require('express')
const router=express();
const model=require("../Model/Lonex")
const {handleSignup,handleLogin,upload,handleSignupGet}=require("../controler/user")
router.post('/signup', upload, handleSignup);
const path = require('path');
router.get('/fetchImage/:userId',handleSignupGet
    
);
router.post("/login",handleLogin)
module.exports=router;