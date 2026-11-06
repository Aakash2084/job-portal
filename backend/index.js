require("dotenv").config();
const express = require('express')
const app = express();
const cookieParser = require("cookie-parser")
const cors = require("cors")



const port = process.env.PORT || 8000 ;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://job-portal-pi-ecru.vercel.app"
    ],
    credentials: true
}))

const mongoConnection = require('./Connections/connection')
mongoConnection(process.env.MONGO_URI)

const userRoutes = require('./Routes/userRoutes')
const companyRoutes = require("./Routes/companyRoutes")
const jobRoutes = require("./Routes/jobRoutes")
const applicationRoutes = require("./Routes/applicationRoutes")
const dashboardRoutes = require("./Routes/dashboardRoutes")

app.use('/user',userRoutes)
app.use("/company",companyRoutes)
app.use("/job",jobRoutes)
app.use("/application",applicationRoutes)
app.use("/dashboard",dashboardRoutes)

app.listen(port,()=>{
    console.log("'server running at port",port)
})