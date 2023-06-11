const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");
const chatController = require("../Controllers/chatController");
router.post("/login", userController.login);
router.post("/register", userController.register);
router.post('/chathistory', chatController.storeChats);
router.post('/chat-message', chatController.getChats);
router.get('/get-all-chats/:user_id', chatController.getAllChats);


//! Keep route(*) at last of all routes
router.get('*', userController.pageNotFound);
module.exports = router;
