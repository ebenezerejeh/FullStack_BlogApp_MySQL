import express from 'express';
import cors from 'cors'
import authRoutes from '../API/routes/auth.js'
import userRoutes from '../API/routes/users.js'
import postRoutes from '../API/routes/posts.js'
import cookieParser from 'cookie-parser';
import multer from 'multer';


const app = express();

// to help us receive json data
app.use(cookieParser());
app.use(express.json());
let corsOptions = {
    origin: ["http://localhost:5173"],
    credentials: true,
    optionsSuccessStatus: 200,
  };



app.use(cors(corsOptions))


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname)
  }
})

const upload = multer({ storage: storage })



app.post('/api/upload', upload.single('file'), function (req, res) {
  // req.file is the name of your file in the form above, here 'uploaded_file'
   // req.body will hold the text fields, if there were any 
  const file = req.file
  res.status(200).json(file.filename)
  
})

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)


app.listen(8800, ()=>{
    console.log('connected')
})

