const express = require("express")
const isAuthenticated = require('../middleware/auth')
const authorizeRoles = require('../middleware/authorizeRoles')
const {createJob,getAllJobs,getJobById,updateJob,deleteJob,getMyJobs} = require('../controllers/jobControllers')
const router = express.Router()


router.post("/",isAuthenticated,authorizeRoles("recruiter"),createJob)
router.get("/",isAuthenticated,authorizeRoles("jobseeker","recruiter"),getAllJobs)
router.get(
  "/my-jobs",
  isAuthenticated,
  authorizeRoles("recruiter"),
  getMyJobs
);
router.get("/:id",isAuthenticated,authorizeRoles("jobseeker","recruiter"),getJobById)
router.put("/:id",isAuthenticated,authorizeRoles("recruiter"),updateJob)
router.delete('/:id',isAuthenticated,authorizeRoles("recruiter"),deleteJob)

module.exports = router