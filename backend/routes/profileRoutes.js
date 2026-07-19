const express = require("express");
const router = express.Router();

const profile = require("../controllers/profileController");
const authmiddleware = require("../middleware/authMiddleware");

router.get("/get", authmiddleware.Protect, profile.getProfileData);