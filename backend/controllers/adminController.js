
import validator from "validator";
import bcrypt from 'bcryptjs'
import { v2 as cloudinay } from 'cloudinary'
import doctorModel from "../models/doctorModels.js";
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModels.js";


// Api for Adding doctor

const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file

        console.log({ name, email, password, speciality, degree, experience, about, fees, address }, imageFile)

        //cheking for data to add doctor

        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" })
        }

        // validating email format 

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please Enter a valid email" })
        }

        // validatin strong password

        if (password.length < 0) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hasing doctor passwrod

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // upload image to cloudinay 
        const imageUpload = await cloudinay.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            image: imageUrl,
            date: Date.now()
        }

        const newDoctor = await new doctorModel(doctorData)
        await newDoctor.save()

        res.json({ success: true, message: "Doctor Added" })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Api for admin login

const loginAdmin = async(req,res)=>{
    try {
        const {email,password}= req.body;

        if(email=== process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
          const token = jwt.sign(email+password,process.env.JWT_SECRET)
          res.json({success:true,token})
        }else{
            res.json({success:false,message:"Invalid credentials"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }
}

// Api to get all doctor list for admin panel

const allDoctors = async (req,res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true,doctors})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


// Api to get all appointment list

const appointmentsAdmin = async (req,res) => {
    try {
        const appointments = await appointmentModel.find({})
        res.json({success:true,appointments}) 
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
    
}

// Api for appointment cancel appointment

const appointmentCancel = async (req, res) => {
    try {

        const { appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)


        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        // releasing doctor slot

        const { docId, slotDate, slotTime } = appointmentData

        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: 'Appointment cancelled' })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Api to get dashboard  data for admin paner

const adminDashboard = async (req,res) => {
    try {
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointment = await appointmentModel.find({})

        const dashData = {
            doctors:doctors.length,
            appointments: appointment.length,
            patients:users.length,
            latestAppointment:appointment.reverse().slice(0,5)
        }

        res.json({success:true,dashData})
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { addDoctor ,loginAdmin,allDoctors,appointmentsAdmin,appointmentCancel,adminDashboard}