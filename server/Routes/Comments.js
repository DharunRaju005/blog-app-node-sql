const express = require("express");
const AuthenticateUser = require("../Middleware/CheckUser.js");
const { addComments, getComments, updateComments, deleteComments } = require("../Controllers/CommentController");

const router = express.Router();

router.post("/:data_id", AuthenticateUser, addComments);
router.get("/:data_id", AuthenticateUser,getComments);
router.put("/:data_id", AuthenticateUser, updateComments);
router.delete("/:data_id", AuthenticateUser, deleteComments);

module.exports = router;
