const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    requirements: {
      type: [String],
      required: true,
      validate: {
        validator: function (value) {
          return value.length > 0;
        },
        message: "At least one requirement is required",
      },
    },

    salary: {
      type: Number,
      required: true,
      min: 0,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

  experienceLevel: {
  type: Number,
  required: true,
  min: 0,
},

    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship", "Contract"],
      required: true,
    },

    workmode: {
      type: String,
      enum: ["Remote", "Hybrid", "On-site"],
      required: true,
    },

    position: {
      type: Number,
      required: true,
      min: 1,
    },
status: {
    type: String,
    enum: ["Open","Paused", "Closed"],
    default: "Open",
},
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;