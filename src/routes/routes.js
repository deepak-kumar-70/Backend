const express=require('express')
const router=express();
const model=require("../Model/Lonex")
const {handleSignup,
    handleLogin,upload,
    handleSignupGet,handleGetAllData}=require("../controler/user")
router.post('/signup', upload, handleSignup);
router.get('/fetchImage/:userId',handleSignupGet);
router.get('/getalldata',handleGetAllData)
router.post("/login",handleLogin)
module.exports=router;