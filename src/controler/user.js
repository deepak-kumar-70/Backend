const model=require("../Model/Lonex")
const jwt=require("jsonwebtoken")
const multer  = require('multer')
const path = require('path');
const bcrypt = require("bcrypt");
const upload = multer({  
    storage : multer.diskStorage({
          destination: function (req, file, cb) {
            cb(null, 'uploads')
          },
          filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const fileExtension = path.extname(file.originalname);
            cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
        }    
        })       
   }).single("images")
const handleSignup=async(req, resp)=>{
    try {
        const { password, comfirmPassword, mobile } = req.body;
        const existingUser = await model.findOne({ mobile});
        if (existingUser) {
            return resp.status(400).json({ message: "User already exists" });
        }
        if (password === comfirmPassword && mobile.length == 10) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const hashedConfirmPassword = await bcrypt.hash(comfirmPassword, 10);
            const user = new model({
                ...req.body,
                password: hashedPassword,
                confirmPassword:hashedConfirmPassword,
                images: req.file.filename
            });
            const result = await user.save();
            resp.status(201).json({ message: "Account created successfully", user: result });
        } else {
            if (mobile.length != 10) {
                resp.status(400).json({ message: "Mobile number should have 10 characters" });
            } else {
                resp.status(400).json({ message: "Passwords do not match" });
            }
        }
    } catch (e) {
        resp.status(500).json({ message: "Internal server error" });
        console.error(e);
    }
}
const handleSignupGet=async(req,res)=>{
    try{
        const userId = req.params.userId; 
        const user = await model.findById({ _id: userId });
        console.log(user,"hello")
        if (!user || !user.images) { 
            return res.status(404).send('Image not found');
        }
        res.setHeader('Content-Type', 'image/jpeg'); 
        const paths=path.join(__dirname,"..","uploads",user.images )
        res.sendFile(paths); 
        console.log(paths,"yes")
    }catch (e) {
        resp.status(500).json({ message: "Internal server error" });
        console.error(e);
    }
}
const handleLogin=async(req, resp)=>{
    try {
        const { email, password } = req.body;
        const user = await model.findOne({ email });
        console.log(user._id)
        if (!user) {
            return resp.status(401).json({ message: "Unauthorized user" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            const token=await jwt.sign({
               "userid":user._id
            } ,
            "numbetdfyttytytryrtyrjjjj"
            )
            resp.json({token})
            resp.status(200).json({ message: "Login successful" });
        } else {
            resp.status(401).json({ message: "Unauthorized user" });
        }
    } catch (e) {
        resp.status(500).json({ message: "Internal server error" });
        console.error(e);
    }
}
module.exports={
    handleSignup,
    handleLogin,
    handleSignupGet,
    upload
};
