const User = require("../Models/userModal");
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.send(user);
    } else {
      return res.status(400).json(error);
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};
exports.register = async (req, res) => {
  try {
    const newuser = new User(req.body);
    newuser.password = req.body.password;
    await newuser.save();
    res.send("User registered successfully!");
  } catch (error) {
    return res.status(400).json(error);
  }
};

// page not found
exports.pageNotFound = async (req, res) => {
  try {
    res.render("404 Request page not found!");
  } catch (error) {
    console.log(error);
  }
};