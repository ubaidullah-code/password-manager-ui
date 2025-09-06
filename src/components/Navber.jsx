
import { logoutAuth } from "@/store/auth-slice/AuthSlice";
import {  getManager } from "@/store/password-manager-Slice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";



export default function Navber() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const logout = async () => {
    try {
  
 
      dispatch(logoutAuth())
      .unwrap()
      .then(()=>{
        navigate('/auth/login')

      }).catch((err)=>{
        console.log("err", err)
      })

    } catch (error) {
      
      null
    }
  };
  useEffect(() => {
    dispatch(getManager(search))

  }, [search]);

  return (
    <header className="bg-white/90 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand */}
          <div className="flex items-center gap-4">
            <button
              className="inline-flex items-center gap-2 focus:outline-none"
              aria-label="Open sidebar"
            >
              <svg
                className="w-8 h-8 text-indigo-600"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L3 6v5c0 5 3.6 9.7 9 11 5.4-1.3 9-6 9-11V6l-9-4z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-semibold text-slate-800">Vaultly</span>
            </button>

            {/* Search (desktop only) */}
            <div className="hidden md:flex items-center">
              <label className="relative block">
                <span className="sr-only">Search passwords</span>
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="w-5 h-5 text-slate-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 21l-4.35-4.35"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="11"
                      cy="11"
                      r="6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <input
                  className="pl-10 pr-4 py-2 w-72 rounded-lg border border-slate-200 bg-white text-sm placeholder-slate-400 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400"
                  placeholder="Search passwords, notes, logins..."
                  type="search"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </label>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {/* Profile dropdown - hidden on mobile */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setProfileOpen((s) => !s)}
                className="flex items-center gap-2 rounded-full p-1 focus:outline-none"
                aria-expanded={profileOpen}
                aria-haspopup="true"
              >
                <img
                  src="https://api.dicebear.com/6.x/bottts/svg?seed=user"
                  alt="avatar"
                  className="w-8 h-8 rounded-full border border-slate-200"
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-30">
                  {/* <button className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50">
                    Profile
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50">
                    Settings
                  </button> */}
                  <div className="border-t border-slate-100 my-1" />
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-slate-50"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-slate-100 focus:outline-none"
              onClick={() => setMobileOpen((s) => !s)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6 text-slate-700"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-slate-100 bg-white">
          <div className="px-4 py-3 space-y-2">
            <input
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 bg-white text-sm placeholder-slate-400"
              placeholder="Search passwords..."
              type="search"
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* <button className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-50">
              Profile
            </button> */}
            <button
              className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-50 text-rose-600"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
