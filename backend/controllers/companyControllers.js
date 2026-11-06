const Company = require("../Models/company")
const User = require("../Models/user");


const registerCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        msg: "Company name is required",
      });
    }

    const existingCompany = await Company.findOne({
      name: name.trim(),
      createdBy: req.user.id,
    });

    if (existingCompany) {
      return res.status(400).json({
        success: false,
        msg: "You have already registered this company",
      });
    }

    const recruiter = await User.findById(req.user.id);

    if (!recruiter) {
      return res.status(404).json({
        success: false,
        msg: "Recruiter not found",
      });
    }

    const company = await Company.create({
      name: name.trim(),
      description,
      website,
      location,
      logo: req.file?.path || "",
      createdBy: recruiter._id,
    });

    recruiter.profile.company = company._id;
    await recruiter.save();

    return res.status(201).json({
      success: true,
      msg: "Company registered successfully",
      company,
    });
  } catch (error) {
    console.error("Register company error:", error);

    return res.status(500).json({
      success: false,
      msg: "Failed to register company",
    });
  }
};



const getCompanies = async(req,res)=>{
    try {
        
  const companies = await Company.find({
            createdBy: req.user.id
        });  
     
     if(!companies){
        return res.status(400).json({
            success:false,
            msg:"No comapnies found"
        })
     }

   return res.status(200).json({
  success: true,
  count: companies.length,
  companies,
})
     

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success:false,
            msg:"Internal server error"
        })
    }
}

const getCompanyById = async(req,res)=>{
    try {
        const {id} = req.params;

        if(!id){
            return res.status(404).json({
                success:false,
                msg:"id not found"
            })
        }

    const company = await Company.findById(id);

if (!company) {
    return res.status(404).json({
        success: false,
        message: "Company not found"
    });
}

if (company.createdBy.toString() !== req.user.id) {
    return res.status(403).json({
        success: false,
        message: "Access Denied"
    });
}

        res.status(200).json({
            success:true,
            msg:"company found successfully",
            company
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success:false,
            msg:"Internal server error"
        })
    }
}

const updateCompany = async(req,res)=>{
    try {
       const {id} = req.params;
       const {name,description,website,location,logo} = req.body; 

       const company = await Company.findById(id);

       if(!company){
         return res.status(400).json({
            success:false,
            msg:" company not found "
        })
       }

       if(company.createdBy.toString() !== req.user.id){
        return res.status(400).json({
            success:false,
            msg:"Access denied"
        })
       }

    if (name !== undefined) company.name = name;
if (description !== undefined) company.description = description;
if (website !== undefined) company.website = website;
if (location !== undefined) company.location = location;
if (logo !== undefined) company.logo = logo;

       await company.save();

       res.status(200).json({
        success:true,
        msg:"company details updated successfully"
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
    registerCompany,
    getCompanies,
    getCompanyById,
    updateCompany
}