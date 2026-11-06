const express = require('express')
const router = express.Router();
const isAuthenticated = require('../middleware/auth')
const authorizeRoles = require('../middleware/authorizeRoles')
const {registerCompany,getCompanies,getCompanyById,updateCompany} = require("../controllers/companyControllers")


const { uploadCompanyLogo } = require("../middleware/upload");

router.post(
  "/register",
  isAuthenticated,
  authorizeRoles("recruiter"),
  uploadCompanyLogo.single("logo"),
  registerCompany
);
router.get("/",isAuthenticated,authorizeRoles("recruiter"),getCompanies)
router.get("/:id",isAuthenticated,authorizeRoles("recruiter"),getCompanyById)
router.put('/:id',isAuthenticated,authorizeRoles("recruiter"),updateCompany)


module.exports = router