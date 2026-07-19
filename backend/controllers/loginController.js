const User = require("../models/User");
const ProfileCont = require("../controllers/profileController");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  try {
    const { emailName, password } = req.body;
    if (!emailName || !password) {
      return res.status(400).json({ message: "Enter all required values" });
    }
    var emailNameData = emailName.trim();

    var userData = await User.findOne({
      $or: [{ email: emailNameData },
      { userName: emailNameData }]
    }).select("+password");

    if (userData) {
      var checkPass = await userData.comparePassword(password);
      if (!checkPass) {
        return res.status(400).json({ message: "Wrong password" });
      } else {
        if (!userData.isProfileCreated) {// create profile on login if not created

          var profileData = await ProfileCont.createProfile({
            name: userData.userName,
            userId: userData._id
          });
          if (profileData) {
            userData.isProfileCreated = true;
            await userData.save();
          }
        }
        const token = jwt.sign(
          { userId: userData._id, role: userData.role, userName: userData.userName },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        return res.status(200).json({
          message: "Login successful",
          // user: userData,
          token,
        });
      }
    } else {
      return res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    console.log("Login=> ", error);
    return res.status(500).json({ message: error });
  }
};

module.exports = { loginUser };
