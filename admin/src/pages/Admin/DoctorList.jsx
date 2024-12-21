import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

function DoctorList() {

  const {doctors,aToken,getAllDoctors,changeAvailability}= useContext(AdminContext)

  useEffect(()=>{
     if(aToken){
      getAllDoctors()
     }
  },[aToken])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll '>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 gap-y-6'>
        {
          doctors.map((item,i)=>(
            <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={i}>
              <img className='bg-indigo-50 group-hover:bg-primary transition-all duration-500' src={item.image} alt="" />
              <div className='p-4'>
                 <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                 <p className='text-zinc-600 text-sm '>{item.speciality}</p>
                 <div className='flex mt-2 items-center gap-1 text-sm'>
                  <input onClick={()=>changeAvailability(item._id)} type="checkbox" checked={item.availabel} />
                  <p>Available</p>
                 </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorList
