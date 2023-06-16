const Chat = require("../Models/chatModal");
const moment = require('moment');

exports.storeChats= async (req, res) => {
  try {
    const newchat = req.body;
    const result = new Chat({
        user_id: newchat?.user_id,
        chats: [],
        rating: newchat?.rating
    });
    const chats = await Chat.findOne({ user_id: newchat.user_id });
    if(chats){
        result.chats = chats.chats;
        result.chats.push(newchat.chats);
        await Chat.updateOne({user_id: newchat.user_id}, {$set: { chats: result.chats }})
    }else{
        result.chats.push(newchat.chats);
        res.send(await result.save());
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.getChats = async (req, res) => {
  try {
    const { user_id, message_id } = req.body;
    const chats = await Chat.findOne({ user_id, message_id });
    if (chats) {
      res.send(chats);
    } else {
      return res.status(400).json(error);
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.getAllChats = async (req, res) => {
    try {
      const user_id = req.params.user_id;
      await Chat.find(
        { user_id: user_id},
        (error, values) => {
          if (error) {
            throw error;
          } else {
            res.send(values);
          }
        }
      ).clone().catch(function(err){ console.log(err)});
    } catch (error) {
      return res.status(400).json(error);
    }
  };

exports.deleteAllChats = async(req, res) => {
    try {
        const user_id = req.params.user_id;
        await Chat.deleteMany({user_id: user_id}, (error, values) => {
            if (error) {
              throw error;
            } else {
              res.send(values);
            }
          }).clone().catch(function(err){ console.log(err)});
    } catch (error) {
        return res.status(400).json(error);
    }
}

// page not found
exports.pageNotFound = async (req, res) => {
  try {
    res.render("404 Request page not found!");
  } catch (error) {
    console.log(error);
  }
};