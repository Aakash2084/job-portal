const express = require('express')
const isAuthenticated= require("../middleware/auth")
const authorizeRoles = require("../middleware/authorizeRoles")
const {getRecruiterDashboard,getJobseekerDashboard,getRecentApplications,getRecruiterRecentApplications} = require("../controllers/dashboardControllers")
const router = express.Router()

router.get(
  "/recruiter",
  isAuthenticated,
  authorizeRoles("recruiter"),
  getRecruiterDashboard
);

router.get("/jobseeker",isAuthenticated,authorizeRoles("jobseeker"),getJobseekerDashboard)

router.get(
  "/jobseeker/recent-applications",
  isAuthenticated,
  authorizeRoles("jobseeker"),
  getRecentApplications
);

router.get(
  "/recruiter/recent-applications",
  isAuthenticated,
  authorizeRoles("recruiter"),
  getRecruiterRecentApplications
);



module.exports = router