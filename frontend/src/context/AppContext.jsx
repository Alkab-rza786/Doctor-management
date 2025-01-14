import { createContext, useEffect, useState } from "react";
// import { doctors } from "../assets/assets_frontend/assets";
import axios from 'axios'
import { toast } from 'react-toastify'
export const AppContext = createContext()

const AppContextProvider = (props) => {


    const currencySymbol = '$'

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
    const [userData, setUserData] = useState(false)



    const getDoctorData = async () => {
        try {
            axios.get('https://doctor-management-system-u5yl.onrender.com/api/doctor/list', {
                headers: {
                    Authorization: 'Bearer <token>',
                    'Content-Type': 'application/json',
                },
                withCredentials: true, // Important for sending cookies
            });

            console.log("this is backened url " + backendUrl)
            console.log(data)
            if (data.success) {
                setDoctors(data.doctors)
                console.log(data.doctors)
                console.log("this is backened url " + backendUrl)

            } else {
                toast.error(data.message)
                console.log(data.message)
                console.log("this is backened url " + backendUrl)

            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const loadUserProfileData = async () => {
        try {
            axios.get('https://doctor-management-system-u5yl.onrender.com/api/user/getProfile', {
                headers: {
                    Authorization: 'Bearer <token>',
                    'Content-Type': 'application/json',
                },
                withCredentials: true, // Important for sending cookies
            });
            console.log(data)
            console.log("this is backened url " + backendUrl)

            if (data.success) {
                setUserData(data.userData)
                console.log("this is backened url " + backendUrl)

            } else {
                toast.error(data.message)
                console.log("this is backened url " + backendUrl)

            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getDoctorData()

    }, [])

    useEffect(() => {
        if (token) {
            loadUserProfileData()
        } else {
            setUserData(false)
        }
    }, [token])


    const value = {
        doctors, getDoctorData,
        currencySymbol,
        token, setToken,
        backendUrl,
        userData, setUserData,
        loadUserProfileData
    }


    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}


export default AppContextProvider