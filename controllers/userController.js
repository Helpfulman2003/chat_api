const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const createError = require("../error");
const { set } = require("mongoose");

const userController = {
  login: async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
          next(createError(400, "Incorrect username or password"));
        }
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
          next(createError(400, "Incorrect username or password"));
        }
        return res.status(200).json({
          success: true,
          user
        });
      } catch (error) {
          next(error)
      }
    },
  register: async(req, res, next) => {
    try {
      const { username, email, password } = req.body;
      const usernameCheck = await User.findOne({ username });
      if (usernameCheck) {
        next(createError(400, "Username already used"));
      }
      const emailCheck = await User.findOne({ email });
      if (emailCheck) {
        next(createError(400, "Email already used"));
      }
      const hashPassword = bcrypt.hashSync(password, 10);
      const user = await User.create({
        ...req.body,
        password: hashPassword,
      });
      return res.status(200).json({
        status: true,
        user
      });
    } catch (error) {
        next(error)
    }
  },
  setAvatar: async(req, res, next) => {
    try {
      const userId = req.params.id
      const avatarImage = req.body.image
      const userData = await User.findByIdAndUpdate(userId, 
        {$set: {isAvatarImageSet: true, avatarImage}},
        {new: true}
        )
        return res.json({success: true, data: userData})
    } catch (error) {
        next(err)
    }
  },
  getAllUser: async(req, res, next) => {
    try {
      const users = await User.find({_id: {$ne: req.params.id}}, {email: 1, username: 1, avatarImage: 1, _id: 1})
      return res.json({success: true, data: users})
    } catch (error) {
      next(error)
    }
  }
};

module.exports = userController;
