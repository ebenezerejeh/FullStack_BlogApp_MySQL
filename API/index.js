import express from 'express';
import cors from 'cors'
import authRoutes from '../API/routes/auth.js'
import userRoutes from '../API/routes/users.js'
import postRoutes from '../API/routes/posts.js'
import cookieParser from 'cookie-parser';

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

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)


app.listen(8800, ()=>{
    console.log('connected')
})

