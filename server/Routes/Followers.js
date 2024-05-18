const express=require("express");
const {addFollowing,getFollowing, removeFollowing, getFollowers}=require("../Controllers/FollowersContoller");
const AuthenticateUser=require("../Middleware/CheckUser.js");


const router=express.Router();


router.get("/",AuthenticateUser,getFollowing);
router.get("/followers",AuthenticateUser,getFollowers)
router.post("/:writer_id",AuthenticateUser,addFollowing);
router.delete("/:writer_id",AuthenticateUser,removeFollowing);


module.exports=router;