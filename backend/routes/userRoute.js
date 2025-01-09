import express from 'express'
import { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentRazorpay, verifyRazorPay } from '../controllers/userControllers.js'
import authUser from '../middleware/authUser.js'
import upload from '../middleware/multer.js'


const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/getProfile', authUser, getProfile)
userRouter.post('/updateProfile', upload.single('image'), authUser, updateProfile)
userRouter.post('/bookAppointment', authUser, bookAppointment)
userRouter.get('/appointments', authUser, listAppointment)
userRouter.post('/cancelAppointment', authUser, cancelAppointment)
userRouter.post('/paymentRazorpay', authUser, paymentRazorpay)
userRouter.post('/verifyRazorPay', authUser, verifyRazorPay)







export default userRouter