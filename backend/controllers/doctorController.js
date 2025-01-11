import doctorModel from "../models/doctorModels.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";


const changeAvailability = async (req, res) => {
   try {

      const { docId } = req.body;

      const docData = await doctorModel.findById(docId)
      await doctorModel.findByIdAndUpdate(docId, { availabel: !docData.availabel })
      res.json({ success: true, message: 'Availability Changed' })

   } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
   }
}

const doctorList = async (req, res) => {
   try {
      const doctors = await doctorModel.find({}).select(['-password', '-email'])
      res.json({ success: true, doctors })
   } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
   }
}

// Api for doctor login

const loginDoctor = async (req, res) => {

   try {

      const { email, password } = req.body
      const doctor = await doctorModel.findOne({ email })

      if (!doctor) {
         return res.json({ success: false, message: 'Invalid Credentials ' })
      }

      const isMatch = await bcrypt.compare(password, doctor.password)

      if (isMatch) {

         const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)
         res.json({ success: true, token })
      } else {
         res.json({ success: false, message: 'Invalid Credentials' })
      }

   } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
   }

}

// Api to get doctor appointment for doctor panel

const appointmentDoctor = async (req,res) => {

   try {

      const {docId} = req.body
      const appointments = await appointmentModel.find({docId})

      res.json({success:true,appointments})
      
   } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
   }   
}

const appointmentComplete = async (req,res) => {

   const {docId,appointmentId} = req.body

   const appointmentData = await appointmentModel.findById({appointmentId})

   if(appointmentData && appointmentData.docId === docId){

      await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true})

      return res.json({success:true,message:'Appointment Completed'})

   }else{
      return res.json({success:false,message:"Mark Failed"})
   }
   
}
// const appointmentComplete = async (req,res) => {

//    const {docId,appointmentId} = req.body

//    const appointmentData = await appointmentModel.findById({appointmentId})

//    if(appointmentData && appointmentData.docId === docId){

//       await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true})

//       return res.json({success:true,message:'Appointment Completed'})

//    }else{
//       return res.json({success:false,message:"Mark Failed"})
//    }
   
// }

export { changeAvailability, doctorList, loginDoctor ,appointmentDoctor}