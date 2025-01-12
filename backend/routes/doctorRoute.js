
import express from 'express'
import {doctorProfile, appointmentCancel, appointmentComplete, appointmentDoctor, doctorDahsboard, doctorList, loginDoctor, updateDoctorProfile } from '../controllers/doctorController.js'
import authDoctor from '../middleware/authDoctor.js'

const doctorRouter = express.Router()

doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/appointments',authDoctor,appointmentDoctor)
doctorRouter.post('/appointmentComplete',authDoctor,appointmentComplete)
doctorRouter.post('/appointmentCancel',authDoctor,appointmentCancel)
doctorRouter.get('/dashboard',authDoctor,doctorDahsboard)
doctorRouter.get('/doctorProfile',authDoctor,doctorProfile)
doctorRouter.post('/updateProfile',authDoctor,updateDoctorProfile)


export default doctorRouter