const express=require('express')
const app=express()
const collection=require('./mongo')
const path=require('path')
const hbs=require('hbs')
const multer=require('multer')
const templatePath=path.join(__dirname,'../tempelates')

app.use(express.static(path.join(__dirname,'./Images')))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.set("view engine","hbs")
app.set("views",templatePath)

let ff

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'src/Images')
    },
    filename:(req,file,cb)=>{
        ff=file
        cb(null,ff.originalname)
    }
})

const upload=multer({storage:storage})
let arr=[]


app.get("/",async(req,res)=>{
    const data=await collection.find()
    arr=data
    res.render('home',{arr:data})
})



app.post("/",upload.single("image"),async(req,res)=>{
    try{

        if((ff.mimetype).split('/').pop()=="png" || (ff.mimetype).split('/').pop()=="jpg" || (ff.mimetype).split('/').pop()=="jpeg"){

            data={
                path:ff.originalname
            }

            arr.push(data)
            await collection.insertMany([data])
            // await collection.deleteMany({})

        }
        else{
            res.send("inavlid file")
        }

        res.render('home',{arr:arr})

    
    }
    catch(e){
        console.log(e);
    }
})

app.listen(3000,()=>{
    console.log('port connected');
})
