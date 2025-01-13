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



const corsOptions = {

  origin: ['https://doctor-management-landinpage.onrender.com', 'https://doctor-management-adminpanel.onrender.com' ], // Your frontend URL
  // origin: ['http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token', 'aToken', 'dToken'],
  credentials: true,
};

app.use(cors(corsOptions));

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
