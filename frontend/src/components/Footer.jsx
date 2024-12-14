import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

function Footer() {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

         {/* Left Section  */}
         <div>
             <img className='mb-5 w-40' src={assets.logo} alt="" />
             <p className='w-full md:w-2/3 text-gray-600 leading-6 '>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum ducimus suscipit at minima quaerat officiis, architecto dolor esse illum autem.</p>
         </div>
         
         {/* Center Section  */}
         <div>
             <p className='text-xl font-medium mb-4'>COMPANY</p>
             <ul className='flex flex-col gap-2  text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Contact us</li>
                <li>Privacy Policy</li>
             </ul>
         </div>

         {/* Right section  */}
         <div>
             <p className='text-xl font-medium mb-4'>GET IN TOUCH</p>
             <ul className='flex flex-col gap-2  text-gray-600' >
                <li>8102848501</li>
                <li>alkabrza61@gmail.com</li>
             </ul>
         </div>

        </div>
        <div>
                 {/* -------------Copy Right text----------- */}
                 <hr />
                 <p className='py-5 text-sm text-center'>
                    Copyright 2024@ Prescripto - All Right Reserved.
                 </p>
        </div>
    </div>
  )
}

export default Footer
