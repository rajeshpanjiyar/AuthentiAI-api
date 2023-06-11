const mongoose = require("mongoose");
const uuidv1 = require("uuidv1");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    encry_password: {
      type: String,
      //required: true,
    },
    email: { type: String, required: true },
    phone: { type: String },
    admin: {
      type: Boolean,
      default: false,
    },
    salt: String,
  },
  { timestamp: true }
);


userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },
  securePassword: function (plainpassword) {
    if (!plainpassword) return "";

    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return err;
    }
  },
};

//exporting module
module.exports = mongoose.model("User", userSchema);