const express = require("express");
const {getPosts, createPost}= require("../controllers/post");
const {createPostValidator} = require('../validator');
const {userById}= require("../controllers/user");
const {requireSignin}= require("../controllers/auth");

const router = express.Router();

router.get("/", getPosts);
router.post("/post/new/:userId", requireSignin, createPost);

//any route containing userId, our app will first execute userById()
router.param("userId", userById);

module.exports = router;
