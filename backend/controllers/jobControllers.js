const Job = require('../Models/jobs')
const Company = require("../Models/company");

const createJob = async(req,res)=>{

  try {
  
    const {title,description,requirements,salary,
      location,experienceLevel,jobType,
      workmode,position,status} = req.body;

    if(!title || !description || !requirements || !salary
      || !location || !experienceLevel || !jobType || 
      !workmode || !position || !status
     ){
return res.status(400).json({
  success:false,
  msg:"All feilds are required"
})
    }


const existingCompany = await Company.findOne({
  createdBy: req.user.id,
});

if (!existingCompany) {
  return res.status(404).json({
    success: false,
    msg: "Company not found",
  });
}

    let skills = requirements;

if (typeof requirements === "string") {
  skills = requirements
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

  const job = await Job.create({
  title,
  description,
  requirements: skills,
  salary,
  location,
  experienceLevel,
  jobType,
  workmode,
  position,
  status,
  company: existingCompany._id,
  createdBy: req.user.id,
});

console.log(job)
    res.status(201).json({
      success:true,
      msg:"Job created succesfully"
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success:false,
      msg:"Internal server error"
    })
  }

}

const getAllJobs = async (req, res) => {
  try {
    const {
      search,
      location,
      jobType,
      workmode,
      experienceLevel,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};

    // Search
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Location
    if (location) {
      filter.location = {
        $regex: location,
        $options: "i",
      };
    }

    // Job Type
    if (jobType) {
      filter.jobType = jobType;
    }

    // Work Mode
    if (workmode) {
      filter.workmode = workmode;
    }

    // Experience
    if (experienceLevel !== undefined && experienceLevel !== "") {
      filter.experienceLevel = Number(experienceLevel);
    }

    const skip = (Number(page) - 1) * Number(limit);

    const jobs = await Job.find(filter)
      .populate("company", "name logo location website")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const totalJobs = await Job.countDocuments(filter);

    return res.status(200).json({
      success: true,
      count: jobs.length,
      totalJobs,
      currentPage: Number(page),
      totalPages: Math.ceil(totalJobs / Number(limit)),
      jobs,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getJobById = async(req,res)=>{
  try {
       const { id } = req.params;
    const job = await Job.findById(id)
    .select("-__v")
    .populate("company", "name logo description location website")
    .populate("createdBy", "fullName email");

    if(!job){
      return res.status(400).json({
        success:false,
        msg:"No job found with this id"
      })
    }

    return res.status(200).json({
      success:true,
      msg:"Job found successfully"
      ,job
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success:false,
      msg:"Internal server error"
    })
  }
}

const getMyJobs = async(req,res)=>{
  try {
   const jobs = await Job.find({createdBy:req.user.id})
   .populate("company","name logo location website")
   .sort({createdAt:-1});

      const openJobs = await Job.find({
        createdBy:req.user.id,
        status:"Open"
      })

    const closedJobs = await Job.find({
        createdBy:req.user.id,
        status:"Closed"
      })

   const pausedJobs = await Job.find({
        createdBy:req.user.id,
        status:"Paused"
      })

   return res.status(200).json({
    success:true,
    count:jobs.length,
    openJobs,
    closedJobs,
    pausedJobs,
    jobs,
   })

  } catch (error) {
    console.error(error)

    return res.status(404).json({
      success:false,
      msg:"Internal server error"
    })

  }
}

const updateJob = async(req,res)=>{
  try {
    
    if (Object.keys(req.body).length === 0) {
  return res.status(400).json({
    success: false,
    message: "Please provide data to update",
  });
}

    const {id} = req.params;

      const {title,description,requirements,salary,
      location,experienceLevel,jobType,
      workmode,position,status,company} = req.body;
   const job = await Job.findById(id);
    if(!job){
      return res.status(404).json({
        success:false,
        msg:"No job found"
      })
    }

    if (job.createdBy.toString() !== req.user.id) {
  return res.status(403).json({
    success: false,
    msg: "Access denied",
  });
}

 const allowedFields = [
  "title",
  "description",
  "requirements",
  "salary",
  "location",
  "experienceLevel",
  "jobType",
  "workmode",
  "position",
  "status",
  "company",
];

allowedFields.forEach((field) => {
  if (req.body[field] !== undefined) {
    job[field] = req.body[field];
  }
});

    await job.save()

    return res.status(200).json({
      success:true,

      msg:"Job updated successfully",
      job
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success:false,
      msg:"Internal server error"
    })
  }
}

const deleteJob = async(req,res)=>{
  try {
    const {id} = req.params;

    const job = await Job.findOneAndDelete({
      _id:id,
      createdBy:req.user.id,
    })

    if(!job){
      return res.status(404).json({
        success:false,
        msg:"No job found",
      })
    }

    return res.status(200).json({
      success:true,
      msg:"Job deleted successfully"
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success:false,
      msg:"Internal server error"
    })
  }
}


module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getMyJobs
  
}