const express = require("express");
const multer  = require('multer');
const usersModel = require("../models/usersModel");
const verifyAuth = require("../middleware/verifyAuth");
const rolesAllowed = require("../middleware/roleBasedAuth");
const cloudinary = require("cloudinary");
const {v4} = require("uuid")
const router = express.Router();

// const upload = multer({ dest: 'public/images/' })
const storage = multer.diskStorage({
    destination:(req, file,cb)=>{
        cb(null, "public/images/");
    },
    filename:(req, file, cb)=>{
        const newFileName = v4() + "." + (file.mimetype).split('/')[1];
        cb(null, newFileName)
    }
})

const upload= multer({storage})

router.use(verifyAuth);

router.use(rolesAllowed(["user","admin"]));


router.get("/profile", async (req,res,next)=>{
    const userDetails = await usersModel.findById(req.userDetails.userId, "-password");

    res.send(userDetails);
})


router.put("/profile-picture", upload.single("picture"), async(req, res, next)=>{

    

     const uploadResult = await cloudinary.v2.uploader.upload(req.file.path,{
       resource_type:"image",
       
       upload_preset: "kodecamp_4",
     })

     await usersModel.findByIdAndUpdate(req.userDetails.userId,  {profilePictureURL: uploadResult.secure_url});

  
   
    res.status(200).json({
        status: "Successfully",
        message: "Uplaoded Successful",
        newImage: uploadResult.secure_url
      });

})


module.exports = router;