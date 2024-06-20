const express = require("express");
const { getAllPost, getPost, addPost, deletePost, updatePost, getCategoryPost, getPublishedPost, rollbackVersion, showDataVersions, getCategory } = require("../Controllers/PostController");
const jwt = require("jsonwebtoken");
const AuthenticateUser = require("../Middleware/CheckUser.js");

const router = express.Router();

router.get("/",AuthenticateUser, getAllPost);
router.get("/published", AuthenticateUser, getPublishedPost);
router.get("/category", AuthenticateUser, getCategory);
router.get("/category/:cat", AuthenticateUser, getCategoryPost);
router.get("/user/:user_name", AuthenticateUser, getPost);
router.post("/", AuthenticateUser, addPost);
router.delete("/:data_id", AuthenticateUser, deletePost);
router.put("/:data_id", AuthenticateUser, updatePost);
router.put("/rollback/:data_id", AuthenticateUser, rollbackVersion);
router.get("/rollback/:data_id", AuthenticateUser, showDataVersions);

module.exports = router;
