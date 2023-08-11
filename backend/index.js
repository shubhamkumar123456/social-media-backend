const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan')
const cors = require('cors')
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const multer  = require('multer')
const path = require('path')

dotenv.config();
mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_URL)
console.log("connected to mongodb")

app.use("/images",express.static(path.join(__dirname,"public/images")));

app.use(express.json());
app.use(cors());
app.use(helmet())
app.use(morgan("common"))

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images")
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name)
    }
})

const upload = multer({storage})
app.post('/api/upload', upload.single("file"),(req, res, next)=> {
    try {
        return res.status(200).json("file uploaded successfully")
    } catch (error) {
        console.log(error)    
    }
  })

// routers
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);



app.listen(5000, () => {
    console.log("server is running at port 5000...")
})