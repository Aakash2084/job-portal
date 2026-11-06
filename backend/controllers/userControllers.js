const User = require('../Models/user')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const signup = async (req,res)=>{

    try {
        const {fullName,email,password,role,phone,location} = req.body;

        if(!fullName || !email || !password || !role ){
         return   res.status(400).json({
                success:false,
                msg:"All feilds are required"
            });
        }
        if (!["jobseeker", "recruiter"].includes(role)) {
  return res.status(400).json({
    success: false,
    msg: "Invalid role",
  });
}

        const existingUser = await User.findOne({email})

        if(existingUser){
         return   res.status(400).json({
                success:false,
                msg:"User already exists please login "
            })
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const user = await User.create({
            fullName:fullName,
            email:email,
            password:hashedPassword,
            phone:phone,
            role:role,
            location:location,
        });

       return res.status(201).json({
  success: true,
  msg: "Signup successful",
  user: {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    role: user.role,
    location:user.location,
  },
});

    } catch (error) {
        console.error(error)
        res.status(500).json({
            success:false,
            msg:"Internal server error"
        })
    }

}

const login = async (req,res)=>{

    try {
        const {email,password} = req.body;

        if( !email || !password ){
           return res.status(400).json({
                success:false,
                msg:"Invalid email or password"
            });
        }


        const user = await User.findOne({email:email});

        if(!user){
          return   res.status(400).json({
                success:false,
                msg:"incorrect email"
            })
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
         return   res.status(400).json({
                success:false,
                msg:"incorrect email or password"
            })
        }
        
      const token = jwt.sign(
    {
        id: user._id,
        role: user.role
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "7d"
    }
);

       res.cookie("token", token, {
  httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
});

    return res.status(200).json({
            success:true,
            msg:"login succesful",
            user:{
                _id:user._id,
                fullName:user.fullName,
                email:user.email,
                role:user.role,
            },

        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            success:false,
            msg:" Internal server error"
        })
    }

}

const logout = async (req, res) => {
  return res
    .cookie("token", "", {
      maxAge: 0,
      httpOnly: true,
    })
    .status(200)
    .json({
      success: true,
      message: "Logged Out Successfully",
    });
};

const updateProfile = async(req,res)=>{
    try {

  const {
      fullName,
      phone,
      location,
      bio,
      skills,
    } = req.body;

         const user = await User.findById(req.user.id);

  if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.fullName = fullName ?? user.fullName;
    user.phone = phone ?? user.phone;
    user.location = location?? user.location;
    user.profile.bio = bio ?? user.profile.bio;
    user.profile.skills = skills ?? user.profile.skills;
      
        await user.save()

        return res.status(200).json({
            success:true,
            msg:"Profile updated successfully ",
            user:{
                _id:user._id,
                 fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        location:user.location,
        role: user.role,
        profile: user.profile,
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

const updateProfilePhoto = async(req,res)=>{
    try {
        if(!req.file){
            return res.status(400).json({
                success:false,
                msg:"Profile photo is required"
            })
        }

        const user = await User.findById(req.user.id)

        if(!user){
            return res.status(404).json({
                success:false,
                msg:"User not found"
            })
        }

        user.profile.profilePhoto = req.file.path ;

        await user.save()

        return res.status(200).json({
            success:true,
            msg:"Profile photo updated successfully",
            profilePhoto: user.profile.profilePhoto,
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success:false,
            msg:"Internal server error"
        })
    }
}

const updateResume = async(req,res)=>{
    try {

        if(!req.file){
            return res.status(400).json({
                success:false,
                msg:"resume is required"
            })
        }

        const user = await User.findById(req.user.id)

        if(!user){
            return res.status(404).json({
                success:false,
                msg:"User not found"
            })
        }

        user.profile.resume = req.file.path;
        user.profile.resumeOriginalName = req.file.originalname;
        await user.save()

       return res.status(200).json({
  success: true,
  msg: "Resume updated successfully",
  resume: user.profile.resume,
  resumeOriginalName: user.profile.resumeOriginalName,
});

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success:false,
            msg:"Internal server error"
        })
    }
}

const getProfile = async(req,res)=>{
    try {
        const user = await User.findById(req.user.id)
        .select("-password")
        .populate("profile.company","name logo location website ")

        if(!user){
            return res.status(404).json({
                success:false,
                msg:"User not found"
            })
        }

        return res.status(200).json({
            success:true,
            user
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success:false,
            msg:"Internal server error"
        })
    }
}

const changePassword = async(req,res)=>{
    try {
        
        const {currentPassword,newPassword} = req.body;

if(!currentPassword || !newPassword ){
    return res.status(400).json({
        success:false,
        msg:"Current password and new password are required"
    })
}

 if(newPassword.length<6  ){
        return res.status(400).json({
            success:false,
            msg:"New password must be atleast 6 characters"
        })
       }

       const user = await User.findById(req.user.id)

       if(!user){
        return res.status(404).json({
            success:false,
            msg:"User not found "
        })
       }
    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

       const hashedPassword = await bcrypt.hash(newPassword,10)
       
        user.password = hashedPassword;

    await user.save();

        return res.status(200).json({
            success:true,
            msg:"password changed successfully",
            
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
    signup,
    login,
    logout,
    updateProfile,
    updateProfilePhoto,
    updateResume,
    getProfile,
    changePassword
}