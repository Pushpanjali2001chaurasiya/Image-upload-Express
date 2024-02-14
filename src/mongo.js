const mongoose=require('mongoose')

mongoose.connect("mongodb://0.0.0.0:27017/Image-upload")
.then(()=>{
    console.log('mongo connected');
})
.catch(()=>{
    console.log('mongo not connected');
})


const LoginSchema=new mongoose.Schema({
    path:{
        type:String,
        require:true
    }
})

const collection=new mongoose.model("imgCollection",LoginSchema)

module.exports=collection