
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Company logo upload
const companyLogoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "job-portal/company-logos",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const uploadCompanyLogo = multer({
  storage: companyLogoStorage,
  limits: { fileSize: 2 * 1024 * 1024 },
});

// Profile photo upload
const profilePhotoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "job-portal/profile-photos",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const uploadProfilePhoto = multer({
  storage: profilePhotoStorage,
});

// Resume upload
const resumeStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "job-portal/resumes",

    resource_type: (req, file) => {
      return file.mimetype === "application/pdf"
        ? "image"
        : "raw";
    },

    allowed_formats: ["pdf", "doc", "docx"],
  },
});

const uploadResume = multer({
  storage: resumeStorage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = {
  uploadCompanyLogo,
  uploadProfilePhoto,
  uploadResume,
};
