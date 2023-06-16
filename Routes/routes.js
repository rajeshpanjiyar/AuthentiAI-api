const express = require("express");
const router = express.Router();
const chatController = require("../Controllers/chatController");
router.post('/chathistory', chatController.storeChats);
router.post('/chat-message', chatController.getChats);
router.get('/get-all-chats/:user_id', chatController.getAllChats);
router.delete('/delete-all-chats/:user_id', chatController.deleteAllChats);

//! Keep route(*) at last of all routes
router.get('*', chatController.pageNotFound);
module.exports = router;
