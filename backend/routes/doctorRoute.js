
import express from 'express'
import { appointmentDoctor, doctorList, loginDoctor } from '../controllers/doctorController.js'
import authDoctor from '../middleware/authDoctor.js'

const doctorRouter = express.Router()

doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/appointments',authDoctor,appointmentDoctor)


export default doctorRouter