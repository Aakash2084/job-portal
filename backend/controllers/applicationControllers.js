const Job = require('../Models/jobs')
const Application = require('../Models/applicaton')

const applyJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        msg: "Job not found",
      });
    }

    const existingApplicant = await Application.findOne({
      applicant: req.user.id,
      job: id,
    });

    if (existingApplicant) {
      return res.status(400).json({
        success: false,
        msg: "You have already applied for this job",
      });
    }

    const application = await Application.create({
      applicant: req.user.id,
      job: id,
    });

    return res.status(201).json({
      success: true,
      msg: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user.id,
    })
      .populate({
        path: "job",
        populate: {
          path: "company",
          select: "name logo location website",
        },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: applications.length,
      msg: "Applications found successfully",
      applications,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

const getApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findOne({
      _id: jobId,
      createdBy: req.user.id,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        msg: "Job not found or you are not authorized",
      });
    }

    const applications = await Application.find({
      job: jobId,
    })
      .populate(
        "applicant",
        "fullName email phone profile"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: applications.length,
      msg: "Applications found successfully",
      applications,
      
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Pending", "Accepted", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        msg: "Invalid application status",
      });
    }

    const application = await Application.findById(id).populate(
      "job",
      "createdBy"
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        msg: "Application not found",
      });
    }

    if (application.job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        msg: "You are not authorized to update this application",
      });
    }

    application.status = status;

    await application.save();

    return res.status(200).json({
      success: true,
      msg: "Application status updated successfully",
      application,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

const withdrawApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findOne({
      _id: id,
      applicant: req.user.id,
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        msg: "Application not found",
      });
    }

    if (application.status !== "Pending") {
      return res.status(400).json({
        success: false,
        msg: "Only pending applications can be withdrawn",
      });
    }

    await Application.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      msg: "Application withdrawn successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};



module.exports = {
    applyJob,
    getMyApplications,
    getApplicants,
    updateApplicationStatus,
    withdrawApplication
 
}