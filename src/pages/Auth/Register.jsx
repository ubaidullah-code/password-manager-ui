import { registerFromControls } from '@/config'
import React, { useState } from 'react'
import CommonFrom from '@/components/auth/CommonFrom'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { registerUser } from '@/store/auth-slice/AuthSlice'

const initialState ={
    username : "",
     email :"",
        password: "",
}
const Register = () => {
        const dispatch = useDispatch()
        const [formData , setFormData]= useState(initialState)
        const navigate = useNavigate()
    
        const onSubmit = (e)=>{
          e.preventDefault();
           
              dispatch(registerUser(formData))
      .unwrap()
      .then(() => {
        setFormData(initialState); // ✅ reset only after successful dispatch
        navigate('/auth/login')
      })
      .catch((err) => {
        console.error("Registration failed:", err);
      });
    
        }
  return (
    <div className='w-1/2 flex flex-col '>
       <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Register</h1>
   
       <CommonFrom 
         formData={formData}
         setFormData={setFormData}
         onSubmit={onSubmit}
         formControl={registerFromControls}
         buttonFrom={"Register"}
       />
   
       <p className="text-sm text-center text-gray-600 mt-6">
         Already have an Account?{" "}
         <Link to="/auth/login" className="text-primary font-semibold hover:underline">
           Login
         </Link>
       </p>
   
   </div>
  )
}

export default Register
