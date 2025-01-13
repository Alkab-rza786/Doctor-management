import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

// app config 
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middleware
app.use(express.json())
// const corsOptions = {
//     origin: [
//       'https://doctor-management-admin.onrender.com', 
//       'https://doctor-management-front.onrender.com', 
//     ],
//     methods: 'GET,POST,PUT,DELETE',
//     allowedHeaders: 'Content-Type, Authorization',
//   };

// app.use(cors())


const corsOptions = {
  origin: 'https://doctor-management-front.onrender.com', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token'], // Add any custom headers you use
  credentials: true,
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// app.use(cors(corsOptions));



// api end point

app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)


app.get('/', (req, res) => {
  res.send('Api Working great')
})


app.listen(port, () => {
  console.log("Server is Running at", port)
})