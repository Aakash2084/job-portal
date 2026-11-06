const  mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({

    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    job:{
         type:mongoose.Schema.Types.ObjectId,
        ref:"Job",
        required:true,
    }
    ,
    status:{
type:String,
enum:["Pending","Accepted","Rejected"],
default:"Pending"
    },

},{timestamps:true})

const Applicaton = mongoose.model("Application",applicationSchema)

module.exports = Applicaton

