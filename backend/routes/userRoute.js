import express from 'express'
import { registerUser,loginUser, getProfile, updateProfile } from '../controllers/userControllers.js'
import authUser from '../middleware/authUser.js'
import upload from '../middleware/multer.js'


const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/getProfile',authUser,getProfile)
userRouter.post('/updateProfile',upload.single('image'),authUser,updateProfile)







export default userRouter