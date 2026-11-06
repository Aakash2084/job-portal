const Job = require("../Models/jobs")
const Application = require("../Models/applicaton")



const getRecruiterDashboard = async (req, res) => {
  try {
    const recruiterId = req.user.id;

    // Recruiter's jobs
    const jobs = await Job.find({
      createdBy: recruiterId,
    }).select("_id title");

    const jobIds = jobs.map((job) => job._id);

    // Total applications
    const totalApplicants = await Application.countDocuments({
      job: { $in: jobIds },
    });

    // Pending
    const pendingApplicants = await Application.countDocuments({
      job: { $in: jobIds },
      status: "Pending",
    });

    // Accepted
    const acceptedApplicants = await Application.countDocuments({
      job: { $in: jobIds },
      status: "Accepted",
    });

    // Rejected
    const rejectedApplicants = await Application.countDocuments({
      job: { $in: jobIds },
      status: "Rejected",
    });

    return res.status(200).json({
      success: true,
      dashboard: {
        totalJobs: jobs.length,
        totalApplicants,
        pendingApplicants,
        acceptedApplicants,
        rejectedApplicants,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getJobseekerDashboard = async(req,res)=>{
    try {
        const userId = req.user.id;
       const totalApplications = await Application.countDocuments({
        applicant:userId,
       })
       
       const pendingApplications = await Application.countDocuments({
        applicant:userId,
        status:"Pending",
       })

       const acceptedApplications = await Application.countDocuments({
        applicant:userId,
        status:"Accepted",
       })

        const rejectedApplications = await Application.countDocuments({
        applicant:userId,
        status:"Rejected",
       })

       return res.status(200).json({
        success:true,
       dashboard:{
        totalApplications,
        pendingApplications,
        acceptedApplications,
        rejectedApplications
       }
       })
       
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success:false,
            msg:"Internal server error"
        })
    }
}

const getRecentApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user.id,
    })
      .populate({
        path: "job",
        select: "title location company salary jobType workmode",
        populate: {
          path: "company",
          select: "name logo location website",
        },
      })
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getRecruiterRecentApplications = async (req, res) => {
  try {
    // Recruiter ki jobs
    const jobs = await Job.find({
      createdBy: req.user.id,
    }).select("_id");

    const jobIds = jobs.map((job) => job._id);

    // Un jobs ki recent applications
    const recruiterApplications = await Application.find({
      job: { $in: jobIds },
    })
      .populate("job", "title location")
      .populate("applicant", "fullName email phone profile")
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      success: true,
      recruiterApplications,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getRecruiterDashboard,
  getJobseekerDashboard,
  getRecentApplications,
  getRecruiterRecentApplications
};