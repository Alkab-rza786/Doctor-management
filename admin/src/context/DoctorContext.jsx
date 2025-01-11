import axios from "axios";
import { createContext,  useEffect,  useState } from "react";
import { toast } from "react-toastify";


export const DoctorContext = createContext()

const DoctorContextProvider = (props)=>{

    const backendUrl = import.meta.VITE_BACKEND_URL

    const [dToken,setDToken] = useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):'')
    const [appointments,setAppointments] = useState([])

    const getAppointments = async () => {
        try {
            // console.log("function is calling")
            const {data} = await axios.get('http://localhost:4000/api/doctor/appointments',{headers:{dToken}})

            if(data.success){
                setAppointments(data.appointments.reverse())
                console.log(data.appointments)

            }else{
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(data.message)
        }
    }
 


    const value = {
      dToken,setDToken,
      backendUrl,
      appointments,setAppointments,
      getAppointments
    }


    return (
        <DoctorContext.Provider value={value} >
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider