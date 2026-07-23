const express = require("express");
const router = express.Router();

const profile = require("../controllers/profileController");
const authmiddleware = require("../middleware/authMiddleware");

router.get("/get/:id", authmiddleware.Protect, profile.getProfileData);

module.exports = router;