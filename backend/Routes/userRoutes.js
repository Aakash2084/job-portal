const express = require('express')
const  isAuthenticated = require('../middleware/auth')
const {signup,login,logout,updateProfile,updateProfilePhoto,updateResume,getProfile,changePassword} = require('../controllers/userControllers');
const {
  uploadProfilePhoto,
  uploadResume,
} = require("../middleware/upload");

const router = express.Router();

router.post("/signup",signup)

router.post("/login",login)

router.post("/logout",logout)

router.put(
  "/profile",
  isAuthenticated,
  updateProfile
);

router.put(
  "/profile-photo",
  isAuthenticated,
  uploadProfilePhoto.single("profilePhoto"),
  updateProfilePhoto
);

router.put(
  "/resume",
  isAuthenticated,
  uploadResume.single("resume"),
  updateResume
);

router.get(
  "/profile",
  isAuthenticated,
  getProfile
);

router.put(
  "/change-password",
  isAuthenticated,
  changePassword
);

module.exports = router