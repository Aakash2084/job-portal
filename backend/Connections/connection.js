const mongoose = require('mongoose')

   function mongoConnection(url){
mongoose.connect(url)
.then(()=>{
    console.log("database connected")
})
.catch((error)=>{
    console.log(error)
})
}

module.exports = mongoConnection;