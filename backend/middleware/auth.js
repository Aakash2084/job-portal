const jwt = require("jsonwebtoken")
const authenticateUser = (req,res,next)=>{

const token = req.cookies.token;
if(!token){
  return  res.status(401).json({
        success:false,
        msg:" Please login first "
    }) 
}

  try {
       const decoded = jwt.verify(token,process.env.JWT_SECRET) ;
       req.user = decoded;
       next()
    } catch (error) {
        console.error(error)
        return res.status(401).json({
            success:false,
            msg:"User is not authenticated"
        })
    }

} 

module.exports = authenticateUser


