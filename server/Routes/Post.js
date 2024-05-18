const express=require("express");
const {getAllPost,getPost,addPost,deletePost,updatePost,getCategoryPost, getPublishedPost}=require("../Controllers/PostController");
const jwt=require("jsonwebtoken");
const AuthenticateUser=require("../Middleware/CheckUser.js");


const router=express.Router();

router.get("/",AuthenticateUser,getAllPost);
router.get("/published",AuthenticateUser,getPublishedPost);
router.get("/:cat",AuthenticateUser,getCategoryPost);
router.get("/user/:user_name",AuthenticateUser,getPost);
router.post("/",AuthenticateUser,addPost);
router.delete("/:data_id",AuthenticateUser,deletePost);
router.put("/:data_id",AuthenticateUser,updatePost);

module.exports=router;
