const express=require("express");
const {addBookmark,getBookmark, deleteBookmark}=require("../Controllers/BookMarkContoller");
const AuthenticateUser=require("../Middleware/CheckUser.js");


const router=express.Router();

router.get("/",AuthenticateUser,getBookmark);
router.post("/:data_id",AuthenticateUser,addBookmark);
router.delete("/:data_id",AuthenticateUser,deleteBookmark);



module.exports=router;