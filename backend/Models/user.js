const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    phone: {
      type: String,
      trim: true,
    },
  location: {
  type: String,
  trim: true,
  default: "",
},
    

    role: {
      type: String,
      required: true,
      enum: ["jobseeker", "recruiter"],
      default: "jobseeker",
    },

    profile: {
      bio: {
        type: String,
        default: "",
        trim: true,
      },

      skills: [
        {
          type: String,
          trim: true,
        },
      ],

      resume: {
        type: String,
        default: "",
      },

      resumeOriginalName: {
        type: String,
        default: "",
      },

      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
      },

      profilePhoto: {
        type: String,
       default: "/profile.png",
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;