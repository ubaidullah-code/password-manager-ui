import React from 'react'
import { Outlet } from 'react-router-dom' 
const AuthLayout = () => {
  return (
 <div className="flex w-full font-sans min-h-screen">
  {/* LEFT PANEL */}
  <div className="hidden sm:flex w-1/2 bg-[#A8BBA3] justify-center items-center">
    <div className="max-w-md text-center space-y-6">
      <h1 className="font-extrabold text-3xl tracking-tight text-white">
        Password Manager
      </h1>
    </div>
  </div>

  {/* RIGHT PANEL */}
  <div className="w-full sm:w-1/2 bg-[#F7F4EA] flex justify-center items-center px-6 lg:px-8">
    <Outlet />
  
  </div>
</div>
  )
}

export default AuthLayout