import express from 'express'
import { addDoctor,allDoctors,loginAdmin } from '../controllers/adminController.js'
import upload from '../middleware/multer.js'
import authAdmin from '../middleware/authAdmin.js';
import { changeAvailability } from '../controllers/doctorController.js';

const adminRouter = express.Router();

adminRouter.post('/addDoctor',authAdmin ,upload.single('image'), addDoctor)
adminRouter.post('/login',loginAdmin)
adminRouter.get('/allDoctors',authAdmin,allDoctors)
adminRouter.post('/changeAvailability',authAdmin,changeAvailability)


export default adminRouter