const express = require("express")

const isAuthenticated = require("../middleware/auth")
const authorizeRoles = require("../middleware/authorizeRoles")

const {applyJob,getMyApplications,getApplicants,updateApplicationStatus,withdrawApplication} = require('../controllers/applicationControllers')


const router = express.Router()


router.post('/apply/:id',isAuthenticated,authorizeRoles("jobseeker"),applyJob)
router.get(
  "/my-applications",
  isAuthenticated,
  authorizeRoles("jobseeker"),
  getMyApplications
);

router.get(
  "/job/:jobId",
  isAuthenticated,
  authorizeRoles("recruiter"),
  getApplicants
);

router.patch(
  "/:id/status",
  isAuthenticated,
  authorizeRoles("recruiter"),
  updateApplicationStatus
);


router.delete("/:id",isAuthenticated,authorizeRoles("jobseeker"),withdrawApplication)


module.exports = router